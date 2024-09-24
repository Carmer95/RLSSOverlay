import { derived } from "svelte/store";
import { socketMessageStore } from "./socket";

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

// export const teams = derived(updateState, ($update, set) => {
//     if (!$update || !$update.game.teams) return; // Ensure $update and teams are available

//     let orangeTeam = {};
//     let blueTeam = {};

//     // Iterate over the teams and sort them into the two teams
//     $update.game.teams.forEach(team => {
//         if ($update.game.teams[0]) {
//             blueTeam = team[0]
//         } else if ($update.game.teams[1]) {
//             blueTeam = team[1]
//         }
//     });

//     // Set the derived store value with both teams
//     set({ orangeTeam, blueTeam });
// });

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

// export const orangePlayers = derived(updateState, ($update, set) => {
//     if (!$update) return;

//     if($update) {   // This block is executed if $update is truthy.
//         const orangeTeam = ({players}) => { // The code defines a function orangeTeam that expects an object with a players property.
//             Object.keys(players).map((id) => {  // The players property is an object where each key (id) represents a player’s ID. Object.keys(players) gets all player IDs.
//                 if (players[id].team == 0) {    // For each player ID, it checks if players[id].team == 0. If the player is on team 0 (likely the orange team),
//                     return id;  // it returns the player ID.
//                 }
//                 else return;    // Otherwise, it returns undefined (or nothing).
//             })
//         };
//         set(orangeTeam($update)); // Updates the derived store.
//     } else {
//         set({});    // If $update is falsy (after the initial check), it will set the orangePlayers store to an empty object {}.
//     }
// });

// export const bluePlayers = derived(updateState, ($update, set) => {
//     if (!$update) return;

//     if($update) {   // This block is executed if $update is truthy.
//         const blueTeam = ({players}) => { // The code defines a function blueTeam that expects an object with a players property.
//             Object.keys(players).map((id) => {  // The players property is an object where each key (id) represents a player’s ID. Object.keys(players) gets all player IDs.
//                 if (players[id].team == 0) {    // For each player ID, it checks if players[id].team == 0. If the player is on team 0 (likely the blue team),
//                     return id;  // it returns the player ID.
//                 }
//                 else return;    // Otherwise, it returns undefined (or nothing).
//             })
//         };
//         set(blueTeam($update)); // Updates the derived store.
//     } else {
//         set({});    // If $update is falsy (after the initial check), it will set the bluePlayers store to an empty object {}.
//     }
// });

// export const allPlayers = derived(updateState, ($update, set) => {
//     if (!$update) return;

//     if ($update) {
//     let players = $update.data.players;
//       let orangePlayers = [];
//       let bluePlayers = [];

//       Object.keys(players).map((id) => {
//         if (players[id].team == 1) {
//           if (players[id].name.length > 13) {
//             let shorten = players[id].name.split("").slice(0, 15);
//             shorten.push("...");

//             players[id].name = shorten.join("");
//           }
//           orangePlayers.push(players[id]);
//         } else if (players[id].team == 0) {
//           if (players[id].name.length > 13) {
//             let shorten = players[id].name.split("").slice(0, 15);
//             shorten.push("...");

//             players[id].name = shorten.join("");
//           }
//           bluePlayers.push(players[id]);
//         }
//       });
//     }
// })