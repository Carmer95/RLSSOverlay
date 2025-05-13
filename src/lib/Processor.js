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
        set({});
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

export const dataStore = writable(null);

export async function fetchData() {
  try {
    const res = await fetch('http://localhost:1234/api/data');
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    dataStore.set(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    dataStore.set({ error: error.message });
  }
}

let interval;
export function startPolling(ms = 1000) {
  fetchData(); // immediate
  interval = setInterval(fetchData, ms);
}

export function stopPolling() {
  clearInterval(interval);
}