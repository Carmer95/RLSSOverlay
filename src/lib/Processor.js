import { writable, derived, get } from 'svelte/store';
import { socketMessageStore } from './socket';
import { panelDataStore } from './cpsocket';
import { controlSocket } from './cpsocket';

// Live game state from SOS
export const updateState = derived(socketMessageStore, ($msg, set) => {
  if ($msg?.event === 'game:update_state') {
    set($msg.data);
  }
});

// Time remaining
export const timeSeconds = derived(updateState, ($update, set) => {
  set($update?.game?.time_seconds ?? null);
});

// Teams
export const blueTeam = derived(updateState, ($update, set) => {
  set($update?.game?.teams?.[0] ?? {});
});
export const orangeTeam = derived(updateState, ($update, set) => {
  set($update?.game?.teams?.[1] ?? {});
});

// Target player
export const targetPlayer = derived(updateState, ($update, set) => {
  if ($update?.game?.hasTarget) {
    set($update.players[$update.game.target]);
  } else {
    set({});
  }
});

// Grouped players by team
export const teamsStore = derived(updateState, ($update, set) => {
  if (!$update?.players) return;

  const blueTeam = {};
  const orangeTeam = {};

  for (const id in $update.players) {
    const player = $update.players[id];
    (player.team === 0 ? blueTeam : orangeTeam)[id] = player;
  }

  set({ blueTeam, orangeTeam });
});

// --- MVP Player ---
export const mvpPlayer = derived(updateState, ($update, set) => {
  if (!$update?.players) return set(null);

  let topPlayer = null;
  let topScore = -1;

  for (const id in $update.players) {
    const player = $update.players[id];
    if (player.score > topScore) {
      topScore = player.score;
      topPlayer = { ...player, id };
    }
  }

  set(topPlayer);
});

// Overtime + replay state
export const isOT = derived(updateState, ($update, set) => {
  set(Boolean($update?.game?.isOT));
});
export const isReplay = derived(updateState, ($update, set) => {
  set(Boolean($update?.game?.isReplay));
});

// Post-game UI visibility
export const postGameVisible = writable(false);


// --- WebSocket-only update sender ---
function sendPanelUpdate(message) {
  if (controlSocket?.readyState === WebSocket.OPEN) {
    controlSocket.send(JSON.stringify(message));
  } else {
    console.warn('Panel socket not open. Cannot send:', message);
  }
}

// Game control + debounce + tracking

// --- Internal state ---
let lastHandledGameId = null;
let lastGameInit = 0;
let resetTimeout = null;

// --- Match logic ---
socketMessageStore.subscribe(($msg) => {
  if (!$msg?.event) return;
  const now = Date.now();

  if ($msg.event === 'game:initialized') {
    const panel = get(panelDataStore);
    const initId = JSON.stringify($msg.data);
    console.log('New game started. ', panel, ' ', initId, ' ', lastHandledGameId, ' ', lastGameInit );
    if (initId === lastHandledGameId || now - lastGameInit < 3000) return;

    lastHandledGameId = initId;
    lastGameInit = now;

    if (!panel.startSeries || panel.seriesOver) {
      console.log('[Processor] Series not started or already over.');
      return;
    }

    // Only increment if we're not already at bestOf
    const newGame = panel.currentGame + 1;
    let matchHasEnded = false;

    if(panel.blueWins > 0 || panel.orangeWins > 0){
      matchHasEnded = true;
    }
    
    console.log(newGame, matchHasEnded);
    
    if (newGame <= panel.bestOf && matchHasEnded === true) {
       sendPanelUpdate({ setGameNumber: newGame });
       console.log(`[Processor] Incremented currentGame to ${newGame}`);
    }
  }

  if ($msg.event === 'game:match_ended') {
    const panel = get(panelDataStore);
    const winner = $msg.data?.winner_team_num;

    let updated = false;

    if (!panel.startSeries || panel.seriesOver) {
      console.log('[Processor] Series not started or already over.');
      return;
    }

    if (winner === 0) {
      sendPanelUpdate({ blueWins: panel.blueWins + 1 });
      console.log('[Processor] Blue win incremented');
      updated = true;
    } else if (winner === 1) {
      sendPanelUpdate({ orangeWins: panel.orangeWins + 1 });
      console.log('[Processor] Orange win incremented');
      updated = true;
    }

    if (updated) {

      const requiredWins = Math.ceil(panel.bestOf / 2);
      const blueWins = winner === 0 ? panel.blueWins + 1 : panel.blueWins;
      const orangeWins = winner === 1 ? panel.orangeWins + 1 : panel.orangeWins;

      if (blueWins >= requiredWins || orangeWins >= requiredWins) {
        sendPanelUpdate({ seriesOver: true });
        console.log('[Processor] Series is over');
      }
    }
  }
  
  if ($msg.event === 'game:match_destroyed') {
    postGameVisible.set(false);
    console.log('[Processor] match_destroyed — postGameVisible set to false');
  }

  if ($msg.event === 'game:podium_start') {
    console.log('Podium');
    const panel = get(panelDataStore);
    console.log(panel)

    if (panel.seriesOver) {
      console.log('[Processor] Series complete — resetting in 70 seconds');
      clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        sendPanelUpdate({ resetGame: true });
        console.log('[Processor] Series reset after podium');
      }, 70000);
    }

    setTimeout(() => {
      postGameVisible.set(true);
    }, 5000);

  }
});