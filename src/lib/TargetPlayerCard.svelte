<script>
    import { targetPlayer, mvpPlayer  } from "./Processor";

    // if ($targetPlayer.team == 0) {
    //     const name = document.getElementById('name')

    //     name.style.backgroundColor = "blue";
    // }
</script>

<div class="stats">
    <div class="name">
        {$targetPlayer.name}
        {#if $mvpPlayer?.id === $targetPlayer.id}
            <span class="mvp-badge">MVP</span>
        {/if}
    </div>
        <div class="category">
            <li class="score">Score</li>
            <li class="goals">Goals</li>
            <li class="shots">Shots</li>
            <li class="assists">Assists</li>
            <li class="saves">Saves</li>
        </div>
        <div class="value">
            <li class="score-val"><div>{$targetPlayer.score}</div></li>
            <li class="goals-val"><div>{$targetPlayer.goals}</div></li>
            <li class="shots-val"><div>{$targetPlayer.shots}</div></li>
            <li class="assists-val"><div>{$targetPlayer.assists}</div></li>
            <li class="saves-val"><div>{$targetPlayer.saves}</div></li>
    </div>
</div>

<style>
    .stats {
        width: 710px;
        height: 190px;
        /* border-bottom-left-radius: 20%;
        border-bottom-right-radius: 20%; */
        /* background-color: #000; */
        background-image: url('../assets/RLSS_Stat_Box.png');
        background-position: 52% 43%;
        background-size: 970px 500px;
        bottom: -30px;
        left: -24px;
        position: absolute;
        /* box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.9); */
    }

    .name {
        position: absolute;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 29px;
        left: 280px;
        width: 150px;
        height: 60px;
        /* background-color: rgba(128, 128, 128, 0.404); */
        /* border-radius: 5px; */
        border-bottom-left-radius: 20%;
        border-bottom-right-radius: 20%;
        font-size: 20px;
        font-weight: bold;
        /* color: #000; */
        text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
    }

    .mvp-badge {
        position: absolute;
        left: 214px;
        margin-left: 10px;
        color: rgb(255, 255, 255);
        padding: 4px 8px;
        border-radius: 5px;
        font-size: 12px;
        font-weight: bold;
        text-shadow: none;
        text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
    }

    .category {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 100%;
        top: 102px;
        left: 56px;
        font-size: 16px;
        font-weight: bold;
        /* color: #000; */
        text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
    }
    
    .value {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 32px;
        right: 88px;
        top: 122px;
        margin-right: 15px;
        /* margin-top: 15px; */
        font-size: 20px;
        font-weight: bold;
        /* color: #000; */
        text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
    }

    li {
        list-style-type: none;
        position: relative;
        margin-top: 5px;
        margin-left: 50px;
        text-align: left;
        width: 58px;
        text-align: center;
        
    }

    .score-val{
        right: 457px;
        margin: auto;
        top: 4px;
    }

    .goals-val{
        position: absolute;
        margin: auto;
        right: 335px;
        top: 4px;
    }

    .shots-val{
        position: absolute;
        margin: auto;
        right: 228px;
        top: 4px;
    }

    .assists-val{
        position: absolute;
        margin: auto;
        right: 119px;
        top: 4px;
    }

    .saves-val{
        position: absolute;
        margin: auto;
        right: 11px;
        top: 4px;
    }
</style>