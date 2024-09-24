<script>
  import Boost from "./lib/Boost.svelte";
  import { teamsStore, targetPlayer } from "./lib/Processor";
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

  <ul class="blueTeam">
      {#each Object.keys($teamsStore.blueTeam) as playerId}
          <li class="name">{$teamsStore.blueTeam[playerId].name}
            <Team0Boost percent="{$teamsStore.blueTeam[playerId].boost}" />
          </li>
      {/each}
  </ul>
  
  <ul class="orangeTeam">
      {#each Object.keys($teamsStore.orangeTeam) as playerId}
          <li class="name">{$teamsStore.orangeTeam[playerId].name}
            <Team1Boost percent="{$teamsStore.orangeTeam[playerId].boost}" />
          </li>
      {/each}
  </ul>

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
</main>

<style>

.scorebug {
  position: absolute;
  width: 100%;
}

h1 {
  position: absolute;
  margin: auto;
  width: 100%;
  top: 120px;
}
  
li {
  list-style-type: none;
}

.orangeTeam {
  position: absolute;
  margin: 0;
  right: 5px;
  top: 50px;
}

.blueTeam {
  position: absolute;
  margin: 0;
  left: 5px;
  top: 50px;
  padding: 0;
}

.boost {
  position: absolute;
  right: 15px;
  bottom: 15px;
}

.statCard {
  position: absolute;
  background-color: black;
  left: 10px;
  bottom: 10px;
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