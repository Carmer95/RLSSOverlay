

import { derived } from "svelte/store";
import { socketMessageStore } from "./socket";
import { writable } from 'svelte/store';

export const updateState = derived(socketMessageStore, ($msg, set) => {
    if (!$msg) return;

    if ($msg.event === "game:update_state") {
        set($msg.data);
    }
});

export const timeSeconds = derived(updateState, ($update, set) => {
    if (!$update) return;

    if($update.game.time_seconds) {
        const time = $update.game.time_seconds;
        set(time);
    } else {
        set(null);
    }
});

export const blueTeam = derived(updateState, ($update, set) => {
    if (!$update) return;

    if($update.game.teams) {
        const team = $update.game.teams[0];
        set(team);
    } else {
        set({});
    }
});

export const orangeTeam = derived(updateState, ($update, set) => {
    if (!$update) return;

    if($update.game.teams) {
        const team = $update.game.teams[1];
        set(team);
    } else {
        set({});
    }
});

export const targetPlayer = derived(updateState, ($update, set) => {
    if (!$update) return;

    if($update.game.hasTarget) {
        const player = $update.players[$update.game.target];
        set(player);
    } else {
        set({});
    }
});

export const teamsStore = derived(updateState, ($update, set) => {
    if (!$update || !$update.players) return; // Ensure $update and players are available

    const orangeTeam = {};
    const blueTeam = {};

    // Iterate over the players and sort them into the two teams
    Object.keys($update.players).forEach(id => {
        const player = $update.players[id];
        if (player.team === 0) {
            blueTeam[id] = player; // Add to blueTeam if team is 0
        } else if (player.team === 1) {
            orangeTeam[id] = player; // Add to orangeTeam if team is 1
        }
    });

    // Set the derived store value with both teams
    set({ orangeTeam, blueTeam });
});

export const isOT = derived(updateState, ($update, set) => {
    if (!$update) return;

    if ($update){
        const isOT = Boolean($update.game.isOT);
        set(isOT);
    }
});

export const isReplay = derived(updateState, ($update, set) => {
    if (!$update) return;

    if ($update){
        const isRP = Boolean($update.game.isReplay);
        set(isRP);
    }
});

export const postGameVisible = writable(false);

// Listen for the match ended event
socketMessageStore.subscribe(($msg) => {
  if (!$msg || typeof $msg.event !== 'string') return;

  if ($msg.event === 'game:match_ended') {
    postGameVisible.set(true);
  }

  // Optionally reset visibility if a new game starts
  if ($msg.event === 'game:initialized') {
    postGameVisible.set(false);
  }
});

export const panelDataStore = writable(null);

const API_URL = 'http://localhost:1234/api/data';

async function fetchPanelData() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch panel data');
    const data = await res.json();
    panelDataStore.set(data);
  } catch (error) {
    console.error('Panel data fetch error:', error);
    panelDataStore.set({ error: error.message });
  }
}

let interval;
export function startPollingPanelData(ms = 1000) {
  fetchPanelData(); // fetch immediately
  interval = setInterval(fetchPanelData, ms);
}

export function stopPollingPanelData() {
  clearInterval(interval);
}

// --- Backend update helpers ---
function postUpdate(body) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(data => {
    panelDataStore.set(null);
    fetchPanelData();
    return data;
  })
  .catch(err => console.error('Panel data update error:', err));
}

// --- Event listener for auto updates ---
let lastGameInit = 0;
socketMessageStore.subscribe(($msg) => {
  if (!$msg || typeof $msg.event !== 'string') return;

  const now = Date.now();

  if ($msg.event === 'game:initialized' && now - lastGameInit > 3000) {
    lastGameInit = now;
    postUpdate({ incrementGame: true }).then(data =>
      console.log('Game incremented:', data)
    );
  }

  if ($msg.event === 'game:match_ended') {
    const winner = $msg.data?.winner_team_num;
    if (winner === 0) {
      postUpdate({ incrementBlueWin: true }).then(data =>
        console.log('Blue win incremented:', data)
      );
    } else if (winner === 1) {
      postUpdate({ incrementOrangeWin: true }).then(data =>
        console.log('Orange win incremented:', data)
      );
    }
  }
});