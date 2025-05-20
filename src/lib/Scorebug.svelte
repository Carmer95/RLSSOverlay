<script>
    import { orangeTeam, blueTeam, timeSeconds, panelDataStore, fetchData, startPolling, stopPolling } from "./Processor";
    import { onMount, onDestroy } from 'svelte';
    // let time_seconds = $updateState.game.time_seconds;

    // Function to convert seconds to "minutes:seconds" format
    function formatTime(seconds) {
        if (typeof seconds !== 'number' || isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    console.log(blueTeam);

    let panelData;
    let unsubscribe;

    // Fetch data when component mounts
    onMount(() => {
        startPolling(1000);
        fetchData();
        unsubscribe = panelDataStore.subscribe(value => {
            panelData = value;
            console.log(panelData);
        });
    });

    onDestroy(() => {
    stopPolling();
    unsubscribe();
  });
</script>

<div class="bgBox">
    <div class="blue-info">
        <div class="blue-name">
            {#if $timeSeconds}
                {$blueTeam.name}
            {/if}
        </div>
    </div>
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
    <div class="orange-info">
        <div class="orange-name">
            {#if $timeSeconds}
                {$orangeTeam.name}
            {/if}
        </div>
    </div>
</div>
<div class="match-info">
    <div class="team0Ws bWinBoxContainer">
        <!-- Blue wins -->
        {#each Array(Math.ceil((panelData?.bestOf ?? 5) / 2)).fill(0).map((_, i) => i) as i}
            <div class="winBox {i < (panelData?.blueWins ?? 0) ? 'blue active' : ''}"></div>
        {/each}
      </div>
      <div class="details">
        Game {panelData?.currentGame ?? '1'} | Best of {panelData?.bestOf ?? '5'}
      </div>
      <div class="team1Ws oWinBoxContainer">
        <!-- Orange wins -->
        {#each Array(Math.ceil((panelData?.bestOf ?? 5) / 2)).fill(0).map((_, i) => i) as i}
            <div class="winBox {i < (panelData?.orangeWins ?? 0) ? 'orange active' : ''}"></div>
        {/each}
      </div>
</div>

<style>
    .blue-info {
        position: relative;
        display: flex;
        left: 40px;
        font-size: 32px;
        justify-content: start;
        width: 100%;
    }

    .blue-score-bg {
        display: flex;
        justify-content: center;
        height: 90%;
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

    .orange-info {
        position: relative;
        display: flex;
        right: 40px;
        font-size: 30px;
        justify-content: end;
        width: 100%;
    }

    .orange-score-bg {
        display: flex;
        justify-content: center;
        height: 90%;
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
        width: 690px;
        height: 20px;
        background-color: #000;
        display: flex;
        justify-content: center;
        margin: auto;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0);
    }

    .details {
        width: 150px;
    }

    .bWinBoxContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px; /* space between boxes */
        justify-content: flex-start;
    }

    .oWinBoxContainer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 4px; /* space between boxes */
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
        border-radius: 7px 7px 23px 23px;
        width: 800px;
        height: 120px;
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