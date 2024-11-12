<script>
  import Boost from "./lib/Boost.svelte";
  import { teamsStore, targetPlayer, isOT, isReplay } from "./lib/Processor";
  import TargetPlayerCard from "./lib/TargetPlayerCard.svelte";
  import Team0Boost from "./lib/Team0Boost.svelte";
  import Team1Boost from "./lib/Team1Boost.svelte";
  import Scorebug from "./lib/Scorebug.svelte";

  console.log(teamsStore);
</script>

<main>

    <div class="scorebug">
      <Scorebug />
    </div>

  <h1>RLSS</h1>

  {#if $teamsStore}
    <ul class="blueTeam">
        {#each Object.keys($teamsStore.blueTeam) as playerId}
            <li class="player-info"><p class="blue-name">{$teamsStore.blueTeam[playerId].name}</p>
              <Team0Boost percent="{$teamsStore.blueTeam[playerId].boost}" />
            </li>
        {/each}
    </ul>
  {/if}
  
  {#if $teamsStore}
    <ul class="orangeTeam">
        {#each Object.keys($teamsStore.orangeTeam) as playerId}
            <li class="player-info"><p class="orange-name">{$teamsStore.orangeTeam[playerId].name}</p>
              <Team1Boost percent="{$teamsStore.orangeTeam[playerId].boost}" />
            </li>
        {/each}
    </ul>
  {/if}

  {#if $targetPlayer?.name}
    <div class="currentlySpectating">
      <div class="statCard">
        <TargetPlayerCard />
      </div>
      <div class="boost">
          <Boost percent="{$targetPlayer.boost}" />
        
      </div>
    </div>
  {/if}

  <!-- {#if $isOT}
  <p class="overtime">OVERTIME</p>
{/if}

{#if $isReplay}
  <p class="replay">REPLAY</p>
{/if} -->

</main>

<style>
main {
  color: rgb(255, 255, 255);
}

.scorebug {
  position: absolute;
  width: 100%;
}

h1 {
  position: absolute;
  top: -20px;
  right: 100px;
}
  
li {
  list-style-type: none;
}

.blue-name {
  margin: 0px;
  position: relative;
  font-size: 20px;
  text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #000000, 0 0 30px #000000, 0 0 40px #000000, 0 0 55px #000000, 0 0 75px #000000;
}

.orange-name {
  margin: 0px;
  position: relative;
  font-size: 20px;
  text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #000000, 0 0 30px #000000, 0 0 40px #000000, 0 0 55px #000000, 0 0 75px #000000;
}

.orangeTeam {
  position: absolute;
  margin: 0;
  right: 5px;
  top: 100px;
}

.blueTeam {
  position: absolute;
  margin: 0;
  left: 5px;
  top: 100px;
  padding: 0;
}

.boost {
  position: absolute;
  right: 300px;
  bottom: 300px;
}

.statCard {
  position: absolute;
  background-color: black;
  left: 15px;
  bottom: -15px;
  border-radius: 20%;
}

</style>



  <!-- 
  The {#if $targetPlayer?.name} does three things:

  It always has the latest value contained by the targetPlayer Svelte store because we have added a $ to the front. This only works in .svelte files.
  It checks $targetPlayer is not undefined (that’s what the ? before the . is doing)
  It checks that whatever $targetPlayer is, it has a name property that is “truthy” (so not undefined or "") 
  -->

  <!--
  {#if $allPlayers?.team}
  let team0 = [];
  $allPlayers.map((players) => {
    if players
  })
  {/if} 
  -->  

  <!-- <div class="playerelement">
    <ul class="blue">
      {#each allPlayers as player}
        {#if player.team == 0}
          <li>{player.name}</li>
          <li>{player.boost}</li>
          <hr>
        {/if}
      {/each}
        <li class="players">
            <p class="name"></p>
            <p class="boost"></p>
        </li>
    </ul>
    <ul class="orange">
      {#each allPlayers as player}
        {#if player.team == 1}
          <li>{player.name}</li>
          <li>{player.boost}</li>
          <hr>
        {/if}
      {/each}
        <li class="players">
            <p class="name"></p>
            <p class="boost"></p>
        </li>
    </ul>
  </div> -->