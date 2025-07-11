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

// Existing derived store for live updates
const rawTargetPlayer = derived(updateState, ($update, set) => {
  if ($update?.game?.hasTarget) {
    set($update.players[$update.game.target]);
  } else {
    set(null);
  }
});

// New persistent store
export const targetPlayer = writable({});

// Update the targetPlayer only if valid data is available
rawTargetPlayer.subscribe((player) => {
  if (player?.name && typeof player.name === 'string') {
    targetPlayer.set(player);
  }
});

// Store for stacking events
export const statfeedEvents = writable([]);

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
const rawMvpPlayer = derived(updateState, ($update, set) => {
  if ($update?.game?.hasTarget) {
    const players = $update.players;
    let best = null;

    for (const id in players) {
      const player = players[id];
      if (!best || player.score > best.score) {
        best = player;
      }
    }

    set(best || null);
  } else {
    set(null);
  }
});

// New persistent MVP store
export const mvpPlayer = writable({});

// Only update if the MVP data is valid
rawMvpPlayer.subscribe((player) => {
  if (player?.name && typeof player.name === 'string') {
    mvpPlayer.set(player);
  }
});

// Overtime + replay state + roundStart + overlayVisible
export const isOT = derived(updateState, ($update, set) => {
  set(Boolean($update?.game?.isOT));
});

export const isReplay = writable(false);

export const roundStarted = writable(false);

export const seriesStarted = derived(panelDataStore, ($panelData) => {
  return (
    $panelData?.startSeries === true ||
    $panelData?.currentGame > 1 ||
    $panelData?.blueWins > 0 ||
    $panelData?.orangeWins > 0
  );
});

export const manualOverlayOverride = writable(null); // null = auto, otherwise true/false
const internalAutoOverlay = writable(false);

export const overlayVisible = derived(
  [manualOverlayOverride, internalAutoOverlay],
  ([$manual, $auto]) => $manual !== null ? $manual : $auto
);

// Keep overlayVisible in sync with panelDataStore updates
panelDataStore.subscribe(($panel) => {
  if ('overlayVisible' in $panel) {
    manualOverlayOverride.set(
      $panel.overlayVisible === null ? null : Boolean($panel.overlayVisible)
    );
  }
});

// Follow updateState, but let us override manually too
updateState.subscribe(($update) => {
  if ($update?.game?.isReplay !== undefined) {
    isReplay.set($update.game.isReplay);
  }
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

  if ($msg.event === 'game:match_created') {
    const panel = get(panelDataStore);

    // If the previous series was over, reset it now
    if (panel.seriesOver === true) {
      console.log('[Processor] New match created after series ended — resetting series immediately');
      sendPanelUpdate({ resetGame: true });
      return; // Exit early to prevent other logic from running
    }
  }

  if ($msg.event === 'game:initialized') {
    const panel = get(panelDataStore);
    const initId = JSON.stringify($msg.data);

    internalAutoOverlay.set(true);

    console.log('New game started. ', panel, ' ', initId, ' ', lastHandledGameId, ' ', lastGameInit );

    if (initId === lastHandledGameId || now - lastGameInit < 3000) return;

    lastHandledGameId = initId;
    lastGameInit = now;

    const isSeriesMode = panel.bestOf > 1;

    if ((isSeriesMode && !get(seriesStarted)) || panel.seriesOver === true) {
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

  if ($msg.event === 'game:round_started_go') {
    console.log('[Processor] Round started — enabling overlay display');
    roundStarted.set(true);
  }

  if ($msg.event === 'game:match_destroyed' || $msg.event === 'game:initialized') {
    roundStarted.set(false);
  }

  if ($msg.event === 'game:statfeed_event') {
  const { event_name, main_target } = $msg.data;
  if (event_name && main_target?.name) {
    const newEvent = {
      id: Date.now(), // unique ID
      name: main_target.name,
      event: event_name,
      team: main_target.team_num,
    };

    // Push to array and limit to 3
    statfeedEvents.update((events) => {
      const updated = [...events, newEvent];
      return updated.slice(-3); // Keep only last 3
    });

    // Remove after 3 seconds
    setTimeout(() => {
      statfeedEvents.update((events) =>
        events.filter((e) => e.id !== newEvent.id)
      );
    }, 3000);
  }
}

  let lastHandledMatchEndId = null;
  let lastMatchEndTime = 0;

  if ($msg.event === 'game:match_ended') {
    const now = Date.now();
    const panel = get(panelDataStore);

    // Create a match-end ID based on event data
    const matchEndId = JSON.stringify($msg.data);

    // Debounce to avoid double handling
    if (matchEndId === lastHandledMatchEndId || now - lastMatchEndTime < 3000) {
      console.log('[Processor] Duplicate match_ended ignored.');
      return;
    }

    lastHandledMatchEndId = matchEndId;
    lastMatchEndTime = now;

    const winner = $msg.data?.winner_team_num;
    let updated = false;

    const isSeriesMode = panel.bestOf > 1;

    if ((isSeriesMode && !get(seriesStarted)) || panel.seriesOver === true) {
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
    overlayVisible.set(false);
    isReplay.set(false);
    targetPlayer.set({});
    console.log('[Processor] match_destroyed — Overlay set to false');
  }

  if ($msg.event === 'game:podium_start') {
    console.log('Podium');
    overlayVisible.set(false);
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
      internalAutoOverlay.set(true);
    }, 5200);

  }
});