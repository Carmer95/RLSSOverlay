<script>
  import { postGameVisible, blueTeam, orangeTeam, teamsStore, updateState } from './Processor.js';
  import { fade, scale } from 'svelte/transition';
  import { onDestroy } from 'svelte';

  let show = false;
  const unsubscribe = postGameVisible.subscribe(value => show = value);
  onDestroy(() => unsubscribe());

  // Store values
  let blue = {};
  let orange = {};
  let teams = {};
  let winningTeam = null;

  $: $blueTeam && (blue = $blueTeam);
  $: $orangeTeam && (orange = $orangeTeam);
  $: $teamsStore && (teams = $teamsStore);
  $: {
        if ($updateState?.game?.hasWinner) {
            winningTeam = $updateState.game.winner_team_num;
        } else {
            winningTeam = null;
        }
     }
     console.log('Winning Team:', winningTeam);
</script>

{#if show}
  <div class="postgame-overlay" transition:fade>
    <div class="team-panel" class:winner={winningTeam === 0} transition:scale={{ duration: 400 }}>
      <h2>{$blueTeam.name || 'Blue Team'}</h2>
      <p class="score">Score: {blue.score ?? 0}</p>
      <div class="players">
        {#each Object.values(teams.blueTeam) as player}
          <div class="player-card">
            <strong>{player.name}</strong>
            <div class="p-score">Score: {player.score}</div>
            <div class="goals">Goals: {player.goals}</div>
            <div class="shots">Shots: {player.shots}</div>
            <div class="assists">Assists: {player.assists}</div>
            <div class="saves">Saves: {player.saves}</div>
          </div>
        {/each}
      </div>
    </div>

    <div class="team-panel" class:winner={winningTeam === 1} transition:scale={{ duration: 400 }}>
      <h2>{$orangeTeam.name || 'Orange Team'}</h2>
      <p class="score">Score: {orange.score ?? 0}</p>
      <div class="players">
        {#each Object.values(teams.orangeTeam) as player}
          <div class="player-card">
            <strong>{player.name}</strong>
            <div class="p-score">Score: {player.score}</div>
            <div class="goals">Goals: {player.goals}</div>
            <div class="shots">Shots: {player.shots}</div>
            <div class="assists">Assists: {player.assists}</div>
            <div class="saves">Saves: {player.saves}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .postgame-overlay {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4rem;
    background: rgba(0, 0, 0, 0.85);
    padding: 2rem 3rem;
    border-radius: 1.5rem;
    color: white;
    z-index: 999;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    width: 1020px;
    height: 720px;
  }

  .team-panel {
    flex: 1;
    text-align: center;
    padding: 1rem;
    border-radius: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    transition: transform 0.3s ease;
  }

  .team-panel.winner {
    border: 3px solid gold;
    box-shadow: 0 0 20px gold;
    transform: scale(1.10);
  }

  .score {
    font-size: 1.5rem;
    margin: 0.5rem 0 1.5rem;
  }

  .players {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }

  .player-card {
    background: rgba(255, 255, 255, 0.08);
    padding: 0.75rem;
    border-radius: 0.75rem;
    font-size: 0.9rem;
    transition: background 10.3s;
    height: 556px;
  }

  .player-card:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 22px;
    max-width: 100px;
  }

  .p-score {
    margin-top: 70px;
    font-size: 18px;
  }

  .goals {
    margin-top: 70px;
    font-size: 18px;
  }

  .shots {
    margin-top: 70px;
    font-size: 18px;
  }

  .assists {
    margin-top: 70px;
    font-size: 18px;
  }

  .saves {
    margin-top: 70px;
    font-size: 18px;
  }

</style>
