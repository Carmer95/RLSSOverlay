<script>
    import { orangeTeam, blueTeam, timeSeconds } from "./Processor";

    // let time_seconds = $updateState.game.time_seconds;

    // Function to convert seconds to "minutes:seconds" format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);   // Get the number of full minutes
        const remainingSeconds = seconds % 60;      // Get the remaining seconds

        // Format remaining seconds to always have 2 digits (e.g., "02" instead of "2")
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
</script>

<div class="bgBox">
    <div class="blue-info">
        <div class="blue-name">
            {$blueTeam.name}
        </div>
        <div class="blue-score">
            {$blueTeam.score}
        </div>
    </div>
    <div class="game">
        <div class="blue-score">
        </div>
        <div class="time">
            {formatTime($timeSeconds)}
        </div>
        <div class="orange-score">
        </div>
    </div>
    <div class="orange-info">
        <div class="orange-score">
            {$orangeTeam.score}
        </div>
        <div class="orange-name">
            {$orangeTeam.name}
        </div>
    </div>
</div>
<div class="match-info">
    <div class="team0Ws">

    </div>
    <div class="team1Ws">
        
    </div>
</div>

<style>
    .bgBox {
        width: 690px;
        height: 120px;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .match-info {
        width: 420px;
        height: 60px;
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .blue-info {
        position: relative;
        display: flex;
        left: 15px;
        font-size: 24px;
        justify-content: start;
        width: 100%;
    }

    .blue-score {
        position: absolute;
        display: flex;
        justify-content: end;
        width: 100%;
        right: 30%;
    }

    .game {
        position: absolute;
        margin: auto;
        font-size: 30px;
    }

    .orange-info {
        position: relative;
        display: flex;
        right: 15px;
        font-size: 24px;
        justify-content: end;
        width: 100%;
    }

    .orange-score {
        position: absolute;
        display: flex;
        justify-content: start;
        width: 100%;
        left: 30%;
    }
</style>