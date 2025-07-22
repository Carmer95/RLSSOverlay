<script>
  import { blueTeam, orangeTeam, teamsStore, demolishedPlayers, goalScoredEvent } from "./Processor";
  import Scorebug from "./Scorebug.svelte";
  import Team0Boost from "./Team0Boost.svelte";
  import Team1Boost from "./Team1Boost.svelte";
</script>

<div class="replay-ui { $goalScoredEvent ? 'goal-fade' : '' }">
  {#if $goalScoredEvent}
    <div class="corner-fade"></div>

    <div class="goal-info">
    <div class="goal-details">
        <strong>Scorer:</strong>
        <p class="scorer-name">{$goalScoredEvent.scorer.name}</p>
        {#if $goalScoredEvent.assister.name}
        &nbsp; • &nbsp; <strong>Assist:</strong> 
        <p class="scorer-name">{$goalScoredEvent.assister.name}</p>
        {/if}
        <strong>Speed:</strong> 
        <p class="speed">{Math.round($goalScoredEvent.speed)} km/h</p>
    </div>
    </div>
    <div class="goal-overlay">
        <div class="goal-overlay-trim">
        </div>
    </div>
  {/if}
</div>

<style>
.replay-ui {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.goal-overlay {
  position: absolute;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
  width: 1920px;
  background: rgba(0, 132, 255, 0.6);
  height: 720px;
  clip-path: polygon(100% 80%, 80% 80%, 65% 85%, 35% 85%, 20% 80%, 0 80%, 0% 100%, 100% 100%);
  bottom: -10px;
}

.goal-overlay-trim {
  position: absolute;
  z-index: -2;
  bottom: 10px;
  background: rgba(49, 172, 255, 0.6);
  width: 1920px;
  height: 720px;
  clip-path: polygon(100% 80%, 80% 80%, 65% 85%, 35% 85%, 20% 80%, 0 80%, 0% 100%, 100% 100%);
  bottom: -10px;
}

.goal-info {
  position: absolute;
  text-align: center;
  color: white;
  z-index: 1;
  width: 1920px;
  bottom: 26px;
}

.goal-details {
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Nosifer", serif;
}

/* Red faded border corners */
.corner-fade {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(circle at top left, rgba(255, 0, 0, 0.5), transparent 25%),
    radial-gradient(circle at top right, rgba(255, 0, 0, 0.5), transparent 25%),
    radial-gradient(circle at bottom left, rgba(255, 0, 0, 0.5), transparent 25%),
    radial-gradient(circle at bottom right, rgba(255, 0, 0, 0.5), transparent 25%);
}

.scorer-name {
    font-family: "Nosifer", serif;
    margin: 0px 40px 0px 16px;
}

.speed {
    font-family: "Nosifer", serif;
    margin: 0px 20px 0px 16px;
}

</style>
