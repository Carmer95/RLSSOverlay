<script>
    import { orangeTeam, blueTeam, timeSeconds, isOT } from "./Processor";
    import { panelDataStore } from "./cpsocket";
    import { fade } from "svelte/transition";
    
    // let time_seconds = $updateState.game.time_seconds;

    // Function to convert seconds to "minutes:seconds" format
    function formatTime(seconds) {
        if (typeof seconds !== 'number' || isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    $: console.log('panelDataStore: ', $panelDataStore, 'Panel store currentGame: ', $panelDataStore.currentGame );
    $: currentGame = $panelDataStore.currentGame;
    $: blueNameClass = ($blueTeam?.name?.length ?? 0) > 12 ? 'team-name small' : 'team-name';
    $: orangeNameClass = ($orangeTeam?.name?.length ?? 0) > 12 ? 'team-name small' : 'team-name';
    $: seriesInfo = $panelDataStore.seriesInfo ?? '';

</script>

<div  transition:fade class="top-bar">
    <div class="bgBox">
        {#if seriesInfo}
            <div class="series-info">{seriesInfo}</div>
        {/if}
        <!-- Blue Side -->
        <div class="blue-logo">
            {#if $panelDataStore?.blueLogo}
                <img class="blueLogo" src={`/TeamLogos/${$panelDataStore.blueLogo}`} alt="Blue Logo" width="90" height="90" />
            {:else}
                <img class="blueLogo"  src={`/TeamLogos/RLStockLogo.png`} alt="Alt Blue Logo" width="90" height="90" />
            {/if}
        </div>
        <div class="blue-info">
            <div class="{blueNameClass}">
                {($blueTeam?.name) ?? 'Blue Team'}
            </div>
        </div>

        <!-- Game Middle Section -->
        <div class="game">
            <div class="blue-score-bg">
                <div class="blue-score">
                    {$blueTeam.score}
                </div>
            </div>
            {#if $isOT}
                <div class="otTime">
                    {#if typeof $timeSeconds === 'number' && $timeSeconds >= 0}
                        +{formatTime($timeSeconds)}
                    {:else}
                        0:00
                    {/if}
                </div>
            {:else}
                <div class="time">
                    {#if typeof $timeSeconds === 'number' && $timeSeconds >= 0}
                        {formatTime($timeSeconds)}
                    {:else}
                        0:00
                    {/if}
                </div>
            {/if}
            <div class="orange-score-bg">
                <div class="orange-score">
                    {$orangeTeam.score}
                </div>
            </div>
        </div>

        <!-- Orange Side -->
        <div class="orange-info">
            <div class="{orangeNameClass}">
                {($orangeTeam?.name) ?? 'Orange Team'}
            </div>
        </div>
        <div class="orange-logo">
            {#if $panelDataStore?.orangeLogo}
                <img class="orangeLogo" src={`/TeamLogos/${$panelDataStore.orangeLogo}`} alt="Orange Logo" width="90" height="90" />
            {:else}
                <img class="orangeLogo" src={`/TeamLogos/RLStockLogo.png`} alt="Alt Orange Logo" width="90" height="90" />
            {/if}
        </div>
    </div>

    <!-- Match Info -->
    <div class="match-info">
        <div class="team0Ws bWinBoxContainer">
            <!-- Blue wins -->
            {#each Array(Math.ceil(($panelDataStore?.bestOf ?? 5) / 2)).fill(0).map((_, i) => i) as i (i)}
        <div class="winBox {((Math.ceil(($panelDataStore?.bestOf ?? 5) / 2) - 1 - i) < ($panelDataStore?.blueWins ?? 0)) ? 'blue active' : ''}"></div>
    {/each}
        </div>
        <div class="details">
            Game {currentGame ?? '1'} | Best of {$panelDataStore?.bestOf ?? '1'}
        </div>
        <div class="team1Ws oWinBoxContainer">
            <!-- Orange wins -->
            {#each Array(Math.ceil(($panelDataStore?.bestOf ?? 5) / 2)).fill(0).map((_, i) => i) as i}
                <div class="winBox {i < ($panelDataStore?.orangeWins ?? 0) ? 'orange active' : ''}"></div>
            {/each}
        </div>
    </div>
</div>

<style>
    .top-bar{
        height: 120px;
        width: 1080px;
        position: absolute;
        z-index: 6;
    }

    .series-info{
        position: absolute;
        top: -3px;
        margin: auto;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .blueLogo {
        object-fit: contain;
    }

    .orangeLogo {
        object-fit: contain;
    }

    .blue-logo {
        position: absolute;
        display: flex;
        top: 18px;
        left: 32px;
        font-size: 32px;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-position: 50% 50%;
        background-size: 100%;
    }

    .team-name {
        width: 230px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 28px;
        line-height: 1.1;
        padding: 0 4px;
        overflow: visible;
        word-break: break-word;
        white-space: normal;
        flex-direction: column;
    }

    .team-name.small {
        font-size: 24px;
    }

    .blue-info {
        position: absolute;
        display: flex;
        top: 40px;
        left: 110px;
        font-size: 32px;
        justify-content: end;
        width: 250px;
    }

    .blue-score-bg {
        display: flex;
        justify-content: center;
        height: 120px;
        width: 60px;
        /* background-color: rgba(0, 2, 136, .8); */
        border-radius: 20%;
        margin-right: 16px;
    }

    .blue-score {
        font-size: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 18px;
        right: 576px;
    }

    .game {
        position: absolute;
        margin: auto;
        font-size: 44px;
        display: flex;
        width: 100%;
        justify-content: center;
        height: 100%;
        align-items: center;
    }

    .time {
        position:absolute;
        top: 32px;
    }

    .otTime {
        position:absolute;
        top: 38px;
        text-shadow: 0 0 10px #ff0000;
        font-size: 38px;
        left: 438px;
        width: 120px;
        display: flex;
        justify-content: center;
    }

    .orange-logo {
        position: absolute;
        display: flex;
        right: 32px;
        top: 18px;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
    }

    .orange-info {
        position: absolute;
        display: flex;
        right: 110px;
        top: 40px;
        font-size: 32px;
        justify-content: start;
        width: 250px;
    }

    .orange-score-bg {
        display: flex;
        justify-content: center;
        height: 120px;
        width: 60px;
        /* background-color: rgba(255, 115, 0, .8); */
        border-radius: 20%;
        margin-left: 16px;
    }

    .orange-score {
        font-size: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 18px;
        left: 576px;
    }

    .match-info {
        position: absolute;
        z-index: 5;
        margin: auto;
        top: 122px;
        left: 615px;
        width: 690px;
        height: 20px;
        background-color: #000;
        display: flex;
        justify-content: center;
        margin: auto;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0);
        color: rgb(255, 255, 255);
        text-shadow: 0 0 5px #FFF, 0 0 20px #000000;
    }

    .details {
        /* position: absolute; */
        width: 130px;
        margin-top: 3px;
        /* top: 3px;
        left: 282px; */
        font-size: 15px;
        text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.5), 1px -1px 0 rgba(0, 0, 0, 0.5), -1px 1px 0 rgba(0, 0, 0, 0.5), 1px 1px 0 rgba(0, 0, 0, 0.5);
    }

    .bWinBoxContainer {
        /* position: absolute; */
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px; /* space between boxes */
        justify-content: flex-end;
        margin-top: 12px;
        margin-right: 12px;
        /* left: 170px; */
    }

    .oWinBoxContainer {
        /* position: absolute; */
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px; /* space between boxes */
        justify-content: flex-start;
        margin-top: 12px;
        margin-left: 14px;
        /* right: 170px; */
    }
    
    .winBox {
        width: 15px;
        height: 15px;
        margin: 2px;
        border-radius: 10px;
        background-color: transparent;
        border: 1px solid #fff;
        transition: background-color 0.3s ease, border 0.3s ease;
    }

    /* Active (filled) win boxes for each team */
    .winBox.active.blue {
        background-color: #000288;
        border: none;
    }

    .winBox.active.orange {
        background-color: #ff7300;
        border: none;
    }

    .bgBox {
        position: relative;
        z-index: 5;
        border-radius: 7px 7px 23px 23px;
        width: 1000px;
        height: 164px;
        left: 420px;
        color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        font-weight: bold;
        color: #000;
        /* box-shadow: 0px 5px 8px 0px rgba(0,0,0,0.9); */
        text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #000000, 
        0 0 30px #000000;
        background: url('../assets/RLSS_Scorebug.png') no-repeat center center;
        background-size: 100% 306%;
    }

    

</style>