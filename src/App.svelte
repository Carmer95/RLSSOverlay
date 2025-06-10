<script>
  import Boost from "./lib/Boost.svelte";
  import {  orangeTeam, blueTeam, teamsStore, targetPlayer, isOT, isReplay, postGameVisible } from "./lib/Processor";
  import TargetPlayerCard from "./lib/TargetPlayerCard.svelte";
  import Team0Boost from "./lib/Team0Boost.svelte";
  import Team1Boost from "./lib/Team1Boost.svelte";
  import Scorebug from "./lib/Scorebug.svelte"; 
  import PostGame from "./lib/PostGame.svelte";
  // import ControlPanel from './ControlPanel.svelte';
  
  // let players = [];

  function processName(name) {
  if (name.length > 9) {
    return "s-name";
  } else if (name.length > 6) {
    return "m-name";
  } else {
    return "l-name";
  }
}

function truncateName(name, limit = 15) {
  return name.length > limit ? name.slice(0, limit) + '...' : name;
}

  console.log(teamsStore);
</script>

<main>
  <!-- <ControlPanel bind:players={players} /> -->

  {#if $postGameVisible}
  <div class="overlay-container">
    <Scorebug />
    <PostGame />
</div>
  {:else}
    <div class="scorebug">
      <Scorebug />
    </div>

  <h1>RLSS</h1>



  <!-- {#if $teamsStore}
    <ul class="blueTeam">
        {#each Object.keys($teamsStore.blueTeam) as playerId}
            <li class="player-info-b">
              <div class="blue-name-cont"><p class="blue-name">{$teamsStore.blueTeam[playerId].name}</p></div>
              <div class="blue-boost-cont"><p class="blue-boost">{$teamsStore.blueTeam[playerId].boost}</p></div>
              <Team0Boost percent="{$teamsStore.blueTeam[playerId].boost}" />
            </li>
        {/each}
    </ul>
  {/if} -->
  
  {#if $teamsStore}
  <ul class="blueTeam">
    {#each Object.keys($teamsStore.blueTeam) as playerId}
      <li class="player-info-b">
        <div class="blue-name-cont">
          <p class={processName($teamsStore.blueTeam[playerId].name)}>
            {truncateName($teamsStore.blueTeam[playerId].name)}
          </p>
        </div>
        <div class="blue-boost-cont">
          <p class="blue-boost">{$teamsStore.blueTeam[playerId].boost}</p>
        </div>
        <Team0Boost color="#{$blueTeam.color_primary}" percent={$teamsStore.blueTeam[playerId].boost } />
      </li>
    {/each}
  </ul>
{/if}
  
  <!-- {#if $teamsStore}
    <ul class="blueTeam">
        {#each Object.keys($teamsStore.blueTeam) as playerId}
            <li class="player-info-b">
              <div class="blue-name-cont">
                {#if $teamsStore.blueTeam[playerId].name.length > 10}
                  <p class="blue-name">{$teamsStore.blueTeam[playerId].name}</p>
                {:else if $teamsStore.blueTeam[playerId].name.length > 6}
                  <p class="blue-name-m">{truncateName($teamsStore.blueTeam[playerId].name)}</p>
                {:else}
                    <p class="blue-name-l">{$teamsStore.blueTeam[playerId].name}</p>
                {/if}
              </div>
              <div class="blue-boost-cont"><p class="blue-boost">
                
                {$teamsStore.blueTeam[playerId].boost}
              
              </p></div>
              <Team0Boost percent="{$teamsStore.blueTeam[playerId].boost}" />
            </li>
        {/each}
    </ul>
  {/if} -->

  {#if $teamsStore}
  <ul class="orangeTeam">
    {#each Object.keys($teamsStore.orangeTeam) as playerId}
      <li class="player-info-o">
        <div class="orange-name-cont">
          <p class={processName($teamsStore.orangeTeam[playerId].name)}>
            {truncateName($teamsStore.orangeTeam[playerId].name)}
          </p>
        </div>
        <div class="orange-boost-cont">
          <p class="orange-boost">{$teamsStore.orangeTeam[playerId].boost}</p>
        </div>
        <Team1Boost color="#{$orangeTeam.color_primary}" percent="{$teamsStore.orangeTeam[playerId].boost}" />
      </li>
    {/each}
  </ul>
{/if}
  
  <!-- {#if $teamsStore}
    <ul class="orangeTeam">
        {#each Object.keys($teamsStore.orangeTeam) as playerId}
            <li class="player-info-o">
              <div class="orange-name-cont">
                {#if $teamsStore.orangeTeam[playerId].name.length > 9}
                  <p class="orange-name">{$teamsStore.orangeTeam[playerId].name}</p>
                {:else if $teamsStore.orangeTeam[playerId].name.length > 6}
                  <p class="orange-name-m">{$teamsStore.orangeTeam[playerId].name}</p>
                {:else}
                    <p class="orange-name-l">{$teamsStore.orangeTeam[playerId].name}</p>
                {/if}
              </div>
              <div class="orange-boost-cont"><p class="orange-boost">
                
                {$teamsStore.orangeTeam[playerId].boost}
              
              </p></div>
              <Team1Boost percent="{$teamsStore.orangeTeam[playerId].boost}" />
            </li>
        {/each}
    </ul>
  {/if} -->

  {#if $targetPlayer?.name}
    <div class="currentlySpectating">
      <div class="statCard">
        <TargetPlayerCard />
      </div>
      <div class="boost">
        {#if $targetPlayer.team === 0}
          <Boost percent="{$targetPlayer.boost}" color="#{$blueTeam.color_primary}" />
        {:else}
          <Boost percent="{$targetPlayer.boost}" color="#{$orangeTeam.color_primary}" />
        {/if}
      </div>
    </div>
  {/if}
{/if}
  {#if $isOT}
  <p class="overtime">OVERTIME</p>
{/if}

{#if $isReplay}
  <p class="replay">REPLAY</p>
  {#if $targetPlayer?.name}
    <div class="currentlySpectating">
      <div class="statCard">
        <TargetPlayerCard />
      </div>
      <div class="boost">
        {#if $targetPlayer.team === 0}
          <Boost percent="{$targetPlayer.boost}" color="#{$blueTeam.color_primary}" />
        {:else}
          <Boost percent="{$targetPlayer.boost}" color="#{$orangeTeam.color_primary}" />
        {/if}
      </div>
    </div>
  {/if}
{/if}



</main>

<style>
main {
  color: rgb(255, 255, 255);
  width: 100%;
  height: 100%;
}

.scorebug {
  position: absolute;
  width: 100%;
}

.postgame {
  position: absolute;
  width: 100%;
}

h1 {
  position: absolute;
  top: -20px;
  right: 400px;
}
  
li {
  list-style-type: none;
}

.replay {
  font-size: 32px;
  font-weight: 500;
  color: #0004ff;
  position: absolute;
  bottom: 166px;
  left: 26px;
  z-index: 3;
  text-shadow: 0 0 5px #FFF, 0 0 20px #ffffff, 0 0 30px #000000;
}

.overtime {
  font-size: 32px;
  color: #0077ff;
  position: absolute;
  top: 110px;
  right: 640px;
  z-index: 3;
}

.overlay-container {
    position: relative;
    width: 1920px;
    height: 1080px;
    pointer-events: none; /* optional: allows clicks to pass through */
}


.blue-name-cont {
  margin: 0px;
  position: absolute;
  width: 100%;
  text-align: left;
  left: 28px;
  max-width: 180px;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  border: none;
}

.orange-name-cont {
  margin: 0px;
  position: absolute;
  text-align: right;
  width: 100%;
  right: 28px;
  max-width: 180px;
  box-shadow: none;
  outline: none;
  background-color: transparent;
  border: none;
}

.s-name {
  margin: 0px;
  position: relative;
  font-size: 13px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  top: 30px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.m-name {
  margin: 0px;
  position: relative;
  font-size: 16px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  top: 26px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.l-name {
  margin: 0px;
  position: relative;
  font-size: 20px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  top: 24px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

/* .blue-name {
  margin: 0px;
  position: relative;
  font-size: 14px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  top: 46px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.blue-name-m {
  margin: 0px;
  position: relative;
  font-size: 19px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  top: 42px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.blue-name-l {
  margin: 0px;
  position: relative;
  font-size: 26px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  top: 36px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}


.orange-name {
  margin: 0px;
  position: relative;
  font-size: 14px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  text-align: right;
  top: 46px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.orange-name-m {
  margin: 0px;
  position: relative;
  font-size: 19px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  text-align: right;
  top: 42px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
}

.orange-name-l {
  margin: 0px;
  position: relative;
  font-size: 26px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 3px #000000;
  text-align: right;
  top: 36px;
  font-family: "Nosifer", serif;
  color: #ffffff;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
} */


.blue-boost-cont {
  margin: 0px;
  position: absolute;
  text-align: center;
  width: 100px;
  left: 200px;
}

.orange-boost-cont {
  margin: 0px;
  position: absolute;
  text-align: center;
  width: 100px;
  right: 200px;
}

.blue-boost {
  margin: 0px;
  position: relative;
  font-size: 28px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 15px #000000;
  top: 10px;
  font-family: "Pacifico", serif;
  font-weight: 500;
  color: #ffffff;
}

.orange-boost {
  margin: 0px;
  position: relative;
  font-size: 28px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 15px #000000;
  top: 10px;
  font-family: "Pacifico", serif;
  font-weight: 500;
  color: #ffffff;
}

.orangeTeam {
  position: absolute;
  margin: 0;
  right: 0px;
  top: 160px;
  padding: 0;
}

.blueTeam {
  position: absolute;
  margin: 0;
  left: 0px;
  top: 160px;
  padding: 0;
}

.boost {
  position: absolute;
  height: 240px;
  width: 240px;
  right: 50px;
  bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pacifico", serif;
  font-weight: 500;
}

.currentlySpectating {
  position: absolute;
  height: 600px;
  width: 100%;
  top: 480px;
}

.statCard {
  position: absolute;
  background-color: black;
  border-radius: 20%;
  bottom: 30px;
  left: 20px;
}

.player-info-b {
  background-image: url('./assets/RLSS_JellyBoost_-_OG_-_L_-_CROPPED.png');
  background-position: 50% 40%;
  background-size: 300px 140px;
  height: 62px;
  width: 300px;
  border-radius: 0px 0px 0px 30px;
  display: flex;
  align-items: start;
}

.player-info-o {
  background-image: url('./assets/RLSS_JellyBoost_-_OG_-_R_-_CROPPED.png');
  background-position: 50% 40%;
  background-size: 300px 140px;
  height: 62px;
  width: 300px;
  border-radius: 0px 0px 30px 0px;
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