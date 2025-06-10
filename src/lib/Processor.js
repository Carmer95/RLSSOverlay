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

// Overtime + replay state
export const isOT = derived(updateState, ($update, set) => {
  set(Boolean($update?.game?.isOT));
});
export const isReplay = derived(updateState, ($update, set) => {
  set(Boolean($update?.game?.isReplay));
});

// Post-game UI visibility
export const postGameVisible = writable(false);
socketMessageStore.subscribe(($msg) => {
  if ($msg?.event === 'game:match_ended') {
    postGameVisible.set(true);
  } else if ($msg?.event === 'game:initialized') {
    postGameVisible.set(false);
  }
});

// --- WebSocket-only update sender ---
function sendPanelUpdate(message) {
  if (controlSocket?.readyState === WebSocket.OPEN) {
    controlSocket.send(JSON.stringify(message));
  } else {
    console.warn('Panel socket not open. Cannot send:', message);
  }
}

// --- Game initialization and win logic ---
let lastGameInit = 0;
let lastHandledInitId = null;
let lastHandledGameNumber = null;

socketMessageStore.subscribe(($msg) => {
  if (!$msg?.event) return;

  const now = Date.now();

  if ($msg.event === 'game:initialized' && now - lastGameInit > 3000) {
    // Debounce and dedupe
    const initId = JSON.stringify($msg.data);
    const debounceExpired = now - lastGameInit > 3000;

    if (initId !== lastHandledInitId && debounceExpired) {
      lastHandledInitId = initId;
      lastGameInit = now;

      const { blueWins, orangeWins, startSeries, currentGame, bestOf } = get(panelDataStore);
      const nextGame = blueWins + orangeWins + 1;
      if(bestOf === 1) {
        sendPanelUpdate({ orangeWins: 0, blueWins: 0 });
        console.log("1v1 Series: Wins reset.");
      }
      // Only increment game number if series started
      if (startSeries) {
        // Instead of setting currentGame directly, send incrementGame
        // But only if nextGame > currentGame to avoid duplicates
        if (nextGame > currentGame) {
          sendPanelUpdate({ incrementGame: true });
          console.log(`[Processor] Game initialized, incrementing currentGame to ${nextGame}`);
        } else {
          console.log('[Processor] Game initialized but no increment needed');
        }
      } else {
        console.log('[Processor] Series not started, skipping increment');
      }

      postGameVisible.set(false);
    } else {
      console.warn('[Processor] Ignored duplicate game:initialized event');
    }
  }

  if ($msg.event === 'game:match_ended') {
    const panel = get(panelDataStore);
    const currentGame = panel.currentGame;

      if(panel.bestOf === 1) {
        const winner = $msg.data?.winner_team_num;
        if (winner === 0) {
          sendPanelUpdate({ incrementBlueWin: true });
          console.log('[Processor] Blue win incremented');
        } else if (winner === 1) {
          sendPanelUpdate({ incrementOrangeWin: true });
          console.log('[Processor] Orange win incremented');
        }
      }
    // Ensure we only handle one match end per game number
    if (currentGame !== lastHandledGameNumber) {
      lastHandledGameNumber = currentGame;

      const winner = $msg.data?.winner_team_num;
      if (winner === 0) {
        sendPanelUpdate({ incrementBlueWin: true });
        console.log('[Processor] Blue win incremented');
      } else if (winner === 1) {
        sendPanelUpdate({ incrementOrangeWin: true });
        console.log('[Processor] Orange win incremented');
      }

      postGameVisible.set(true);
    } else {
      console.warn(`[Processor] Ignored duplicate match_ended for game ${currentGame}`);
    }
  }
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
