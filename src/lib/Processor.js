// import { derived, writable } from 'svelte/store';
// import { socketMessageStore } from './socket';

// // === Writable Panel Store ===
// export const panelDataStore = writable(null);

// // === Utility: DRY Network POST ===
// async function postToPanel(data) {
//   try {
//     const res = await fetch('http://localhost:1234/api/data', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     const json = await res.json();
//     panelDataStore.set(null);
//     fetchData();
//     return json;
//   } catch (err) {
//     console.error('Panel POST error:', err);
//     return null;
//   }
// }

// // === Update State Store ===
// export const updateState = derived(socketMessageStore, ($msg, set) => {
//   if ($msg?.event === 'game:update_state') {
//     set($msg.data);
//   }
// });

// // === Derived Stores ===
// export const timeSeconds = derived(updateState, ($update, set) => {
//   if ($update?.game && 'time_seconds' in $update.game) {
//     set($update.game.time_seconds);
//   }
// });

// export const teams = derived(updateState, ($update, set) => {
//   if ($update?.game?.teams?.length >= 2) {
//     set({ blue: $update.game.teams[0], orange: $update.game.teams[1] });
//   }
// });

// export const targetPlayer = derived(updateState, ($update, set) => {
//   const targetId = $update?.game?.target;
//   if ($update?.game?.hasTarget && $update.players?.[targetId]) {
//     set($update.players[targetId]);
//   }
// });

// export const teamsStore = derived(updateState, ($update, set) => {
//   if (!$update?.players) return;
//   const blueTeam = {}, orangeTeam = {};

//   Object.entries($update.players).forEach(([id, player]) => {
//     if (player.team === 0) blueTeam[id] = player;
//     else if (player.team === 1) orangeTeam[id] = player;
//   });

//   set({ blueTeam, orangeTeam });
// });

// export const isOT = derived(updateState, ($update, set) => {
//   if ('isOT' in $update?.game) {
//     set(Boolean($update.game.isOT));
//   }
// });

// export const isReplay = derived(updateState, ($update, set) => {
//   if ('isReplay' in $update?.game) {
//     set(Boolean($update.game.isReplay));
//   }
// });

// export const currentGameNumber = derived(panelDataStore, ($panel) => $panel?.currentGame || 1);

// export const gamePhase = derived(updateState, ($update, set) => {
//   const { hasWinner, isReplay, isOT, target, time_seconds } = $update?.game || {};
//   if (hasWinner) set('postgame');
//   else if (isReplay) set('replay');
//   else if (typeof time_seconds === 'number') set('ingame');
//   else set('pregame');
// });

// export const blueTeam = derived(teamsStore, ($teams) => $teams?.blueTeam);
// export const orangeTeam = derived(teamsStore, ($teams) => $teams?.orangeTeam);

// // === Fetch and Polling ===
// export async function fetchData() {
//   try {
//     const res = await fetch('http://localhost:1234/api/data');
//     if (!res.ok) throw new Error('Failed to fetch data');
//     const data = await res.json();
//     panelDataStore.set(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     panelDataStore.set({ error: error.message });
//   }
// }

// let interval;
// export function startPolling(ms = 1000) {
//   fetchData();
//   interval = setInterval(fetchData, ms);
// }

// export function stopPolling() {
//   clearInterval(interval);
// }

// // === Game Event Handlers ===
// let lastGameInitTime = 0;
// let lastMatchEndTime = 0;

// socketMessageStore.subscribe(($msg) => {
//   if (!$msg?.event) return;

//   if ($msg.event === 'game:initialized') {
//     const now = Date.now();
//     if (now - lastGameInitTime > 3000) {
//       lastGameInitTime = now;
//       postToPanel({ incrementGame: true }).then(data => console.log('Incremented game:', data));
//     }
//   }

//   if ($msg.event === 'game:match_ended') {
//     const winner = $msg.data?.winner_team_num;
//     if (winner === 0) {
//       postToPanel({ incrementBlueWin: true }).then(data => console.log('Blue win incremented:', data));
//     } else if (winner === 1) {
//       postToPanel({ incrementOrangeWin: true }).then(data => console.log('Orange win incremented:', data));
//     }
//   }
// });










































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

export const panelDataStore = writable(null);

export async function fetchData() {
  try {
    const res = await fetch('http://localhost:1234/api/data');
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    panelDataStore.set(data);
    console.log(panelDataStore)
  } catch (error) {
    console.error('Error fetching data:', error);
    panelDataStore.set({ error: error.message });
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

// Track last game init to debounce
let lastGameInitTime = 0;
let lastMatchEndTime = 0;

// Listen for game:initialized and notify backend
socketMessageStore.subscribe(($msg) => {
    if (!$msg || typeof $msg.event !== 'string') return;
  
    // Handle game start (increment game number)
    if ($msg.event === 'game:initialized') {
      const now = Date.now();
  
      // Avoid sending duplicate increments
      if (now - lastGameInitTime > 3000) {
        lastGameInitTime = now;
  
        fetch('http://localhost:1234/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ incrementGame: true })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Incremented game on server:', data);
          panelDataStore.set(null);
          fetchData();
        })
        .catch(err => console.error('Error incrementing game:', err));
      }
    }
  
    // Handle match ended (auto update winner)
    if ($msg.event === 'game:match_ended') {
      const winner = $msg.data?.winner_team_num;
  
      if (winner === 0) {
        // Blue team won
        fetch('http://localhost:1234/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ incrementBlueWin: true })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Blue win incremented:', data);
          panelDataStore.set(null);
          fetchData();
        })
        .catch(err => console.error('Error updating blue win:', err));
      } else if (winner === 1) {
        // Orange team won
        fetch('http://localhost:1234/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ incrementOrangeWin: true })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Orange win incremented:', data);
          panelDataStore.set(null);
          fetchData();
        })
        .catch(err => console.error('Error updating orange win:', err));
      }
    }
  });