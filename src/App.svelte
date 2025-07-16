<script>
  import { onMount } from 'svelte';
  import Boost from "./lib/Boost.svelte";
  import { fade } from 'svelte/transition';
  import {  orangeTeam, blueTeam, teamsStore, targetPlayer, isOT, isReplay, postGameVisible, podiumActive, roundStarted, statfeedEvents, shouldShowOverlay } from "./lib/Processor";
  import TargetPlayerCard from "./lib/TargetPlayerCard.svelte";
  import Team0Boost from "./lib/Team0Boost.svelte";
  import Team1Boost from "./lib/Team1Boost.svelte";
  import Scorebug from "./lib/Scorebug.svelte"; 
  import PostGame from "./lib/PostGame.svelte";
  import StatfeedEvent from "./lib/StatfeedEvent.svelte";

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

<div class="statfeed-stack">
  {#each $statfeedEvents as rawEvent (rawEvent.id)}
    <div transition:fade>
      <StatfeedEvent
        event={{
          ...rawEvent,
          teamColor: rawEvent.team === 0 ? $blueTeam.color_primary : $orangeTeam.color_primary
        }}
      />
    </div>
  {/each}
</div>
<main>

  {#if $shouldShowOverlay && !$podiumActive}

    {#if $postGameVisible}
      <!--  PostGame shown only when postGameVisible is true -->
      <div transition:fade class="overlay-container">
        <Scorebug />
        <PostGame />
      </div>
    {:else}
      <!--  Everything else (during live match) -->
      {#if !$postGameVisible && $roundStarted && $targetPlayer?.name && $targetPlayer.name !== 'undefined'}
        <div transition:fade class="currentlySpectating">
          <div class="statCard">
            <TargetPlayerCard
              teamColor={$targetPlayer.team === 0 ? $blueTeam.color_primary : $orangeTeam.color_primary}
            />
          </div>
          <!--  Boost only shown when not postgame -->
          <div class="boost">
            {#if $targetPlayer.team === 0}
              <Boost percent="{$targetPlayer.boost}" color="#{$blueTeam.color_primary}" />
            {:else}
              <Boost percent="{$targetPlayer.boost}" color="#{$orangeTeam.color_primary}" />
            {/if}
          </div>
        </div>
      {/if}

      {#if $roundStarted}
        <div transition:fade class="scorebug">
          <Scorebug />
        </div>

        <h1>RLSS</h1>
        
        <!-- Blue team -->
        {#if $teamsStore}
          <ul transition:fade class="blueTeam">
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
                <Team0Boost color="#{$blueTeam.color_primary}" percent={$teamsStore.blueTeam[playerId].boost} />
              </li>
            {/each}
          </ul>
        {/if}
          
        <!-- Orange team -->
        {#if $teamsStore}
          <ul  transition:fade class="orangeTeam">
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
      {/if}
    {/if}

    <!-- Overtime -->
    {#if $isOT}
      <p  transition:fade class="overtime">OT</p>
    {/if}

    <!-- Replay -->
    {#if $isReplay && !$postGameVisible}
      <div class="replayBorder">
        <p  transition:fade class="replay">REPLAY</p>
        {#if $targetPlayer?.name}
          <div  transition:fade class="currentlySpectating">
            <div class="statCard">
              <TargetPlayerCard
                teamColor={$targetPlayer.team === 0 ? $blueTeam.color_primary : $orangeTeam.color_primary}
              />
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
  right: 336px;
}
  
li {
  list-style-type: none;
}

.replay {
  font-size: 32px;
  font-weight: 500;
  color: #0004ff;
  position: absolute;
  bottom: 140px;
  left: 26px;
  z-index: 3;
  text-shadow: 0 0 5px #FFF, 0 0 20px #ffffff, 0 0 30px #000000;
}

.overtime {
  font-size: 16px;
  color: #ff0000;
  position: absolute;
  top: 136px;
  right: 952px;
  z-index: 3;
  text-shadow: 0 0 2px #000000, 0 0 2px #000000, 0 0 3px #000000;
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
  width: 50px;
  margin: 0px 0px 0px 30px;
  position: relative;
  font-size: 28px;
  text-shadow: 0 0 5px #000000, 0 0 10px #000000, 0 0 15px #000000;
  top: 10px;
  font-family: "Pacifico", serif;
  font-weight: 500;
  color: #ffffff;
}

.orange-boost {
  width: 50px;
  margin: 0px 0px 0px 12px;
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
  left: 1620px;
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
  left: 1630px;
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

.statfeed-stack {
  position: absolute;
  top: 14px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 999;
  align-items: flex-end;
  overflow: hidden;
}

.statfeed-container {
  /* position: absolute;
  top: 20px;
  right: 30px; */
  padding: 0px 8px;
  margin-bottom: 2px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease-out;
  z-index: 999;
  justify-content: start;
  height: 40px;
}

.statfeed-icon {
  width: 50px;
  height: 40px;
}

.statfeed-text {
  font-size: 20px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 4px black;
  margin: 0px 30px 0px 30px;
}

@keyframes slideIn {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

</style>



<!-- New msg: 

data
: 
event_name
: 
"Goal"
main_target
: 
id
: 
"Tusk_2"
name
: 
"Tusk"
team_num
: 
0
[[Prototype]]
: 
Object
match_guid
: 
"BB985EF611F05AB9D2DC4585A58FAB1B"
secondary_target
: 
id
: 
""
name
: 
""
team_num
: 
-1
[[Prototype]]
: 
Object
type
: 
"Goal"
[[Prototype]]
: 
Object
event
: 
"game:statfeed_event"
[[Prototype]]
: 
Object -->