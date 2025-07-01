<script>
    import { orangeTeam, blueTeam, timeSeconds, postGameSnapshot } from "./Processor";
    import { panelDataStore } from "./cpsocket";
    
    // let time_seconds = $updateState.game.time_seconds;

    // Function to convert seconds to "minutes:seconds" format
    function formatTime(seconds) {
        if (typeof seconds !== 'number' || isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    $: console.log('panelDataStore: ', $panelDataStore, 'Panel store currentGame: ', $panelDataStore.currentGame, 'PostGameSnapshot: ', $postGameSnapshot );
    $: currentGame = $panelDataStore.currentGame;

</script>

<div class="top-bar">
    <div class="bgBox">
        <!-- Blue Side -->
        <div class="blue-logo">
            {#if $panelDataStore?.blueLogo}
                <img src="{$panelDataStore.blueLogo}" alt="Blue Logo" width="90" height="90" />
            {/if}
        </div>
        <div class="blue-info">
            <div class="blue-name">
                {#if $timeSeconds}
                    {($postGameSnapshot?.blueTeam?.name || $blueTeam?.name) ?? 'Blue Team'}
                {/if}
            </div>
        </div>

        <!-- Game Middle Section -->
        <div class="game">
            <div class="blue-score-bg">
                <div class="blue-score">
                    {#if $timeSeconds}
                        {$blueTeam.score}
                    {/if}
                </div>
            </div>
            <div class="time">
                {#if typeof $timeSeconds === 'number' && $timeSeconds >= 0}
                    {formatTime($timeSeconds)}
                {:else}
                    0:00
                {/if}
            </div>
            <div class="orange-score-bg">
                <div class="orange-score">
                    {#if $timeSeconds}
                        {$orangeTeam.score}
                    {/if}
                </div>
            </div>
        </div>

        <!-- Orange Side -->
        <div class="orange-info">
            <div class="orange-name">
                {#if $timeSeconds}
                    {($postGameSnapshot?.orangeTeam?.name || $orangeTeam?.name) ?? 'Orange Team'}
                {/if}
            </div>
        </div>
        <div class="orange-logo">
            {#if $panelDataStore?.orangeLogo}
                <img src="{$panelDataStore.orangeLogo}" alt="Orange Logo" width="90" height="90" />
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
            Game {currentGame ?? '1'} | Best of {$panelDataStore?.bestOf ?? '5'}
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
}

    .blue-logo {
        position: absolute;
        display: flex;
        left: 10px;
        font-size: 32px;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
        background-position: 50% 50%;
        background-size: 100%;
    }

    .blue-info {
        position: absolute;
        display: flex;
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
        background-color: rgba(0, 2, 136, .8);
        border-radius: 20%;
        margin-right: 16px;
    }

    .blue-score {
        width: 100%;
        font-size: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
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

    .orange-logo {
        position: absolute;
        display: flex;
        right: 10px;
        font-size: 30px;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
    }

    .orange-info {
        position: absolute;
        display: flex;
        right: 114px;
        font-size: 30px;
        justify-content: start;
        width: 250px;
    }

    .orange-score-bg {
        display: flex;
        justify-content: center;
        height: 120px;
        width: 60px;
        background-color: rgba(255, 115, 0, .8);
        border-radius: 20%;
        margin-left: 16px;
    }

    .orange-score {
        width: 100%;
        font-size: 60px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .match-info {
        position: absolute;
        z-index: 5;
        margin: auto;
        top: 124px;
        left: 614px;
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
        width: 150px;
    }

    .bWinBoxContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px; /* space between boxes */
        justify-content: flex-end;
    }

    .oWinBoxContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px; /* space between boxes */
        justify-content: flex-start;
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
        height: 120px;
        left: 420px;
        background-color: #000;
        color: rgb(255, 255, 255);
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        font-weight: bold;
        color: #000;
        box-shadow: 0px 5px 8px 0px rgba(0,0,0,0.9);
        text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #000000, 0 0 30px #000000, 0 0 40px #000000, 0 0 55px #000000, 0 0 75px #000000;

        /* height: 100vh; */
        --u: 6px; /*size of entire image*/
        /*C1 is the flat top, c2 is left face, c3 is right face */
        --c1: #000000;/*D8BFD8*/
        --c2: #000288; /*4B0082*/
        --c3: #ff7300; /*Medium Purple*/
        /* --gp: 50%/ calc(var(--u) * 16.9) calc(var(--u) * 12.8); */
        --gp: 50%/ calc(var(--u) * 5.63) calc(var(--u) * 4.26);
        background: 
            conic-gradient(from 122deg at 50% 85.15%, var(--c2) 0 58deg, var(--c3) 0 116deg, #fff0 0 100%) var(--gp),
            conic-gradient(from 122deg at 50% 72.5%, var(--c1) 0 116deg, #fff0 0 100%) var(--gp), 
            conic-gradient(from 58deg at 82.85% 50%, var(--c3) 0 64deg, #fff0 0 100%) var(--gp), 
            conic-gradient(from 58deg at 66.87% 50%, var(--c1) 0 64deg, var(--c2) 0 130deg, #fff0 0 100%) var(--gp),
            conic-gradient(from 238deg at 17.15% 50%, var(--c2) 0 64deg, #fff0 0 100%) var(--gp), 
            conic-gradient(from 172deg at 33.13% 50%, var(--c3) 0 66deg, var(--c1) 0 130deg, #fff0 0 100%) var(--gp),
            linear-gradient(98deg, var(--c3) 0 15%, #fff0 calc(15% + 1px) 100%) var(--gp),
            linear-gradient(-98deg, var(--c2)0 15%, #fff0 calc(15% + 1px) 100%) var(--gp),
            conic-gradient(from -58deg at 50.25% 14.85%, var(--c3) 0 58deg, var(--c2) 0 116deg, #fff0 0 100%) var(--gp),
            conic-gradient(from -58deg at 50% 28.125%, var(--c1) 0 116deg, #fff0 0 100%) var(--gp),
            linear-gradient(90deg, var(--c2) 0 50%, var(--c3) 0 100%) var(--gp);
    }

</style>