<script>
    import { targetPlayer } from "./Processor";

    // if ($targetPlayer.team == 0) {
    //     const name = document.getElementById('name')

    //     name.style.backgroundColor = "blue";
    // }
</script>

<div class="stats">
    <div class="name">
        {$targetPlayer.name}
    </div>
        <div class="category">
            <li>Score</li>
            <li>Goals</li>
            <li>Shots</li>
            <li>Assists</li>
            <li>Saves</li>
        </div>
        <div class="value">
            <li>{$targetPlayer.score}</li>
            <li>{$targetPlayer.goals}</li>
            <li>{$targetPlayer.shots}</li>
            <li>{$targetPlayer.assists}</li>
            <li>{$targetPlayer.saves}</li>
    </div>
</div>

<style>
    .stats {
        width: 420px;
        height: 300px;
        border-radius: 20%;
        /* border-bottom-left-radius: 20%;
        border-bottom-right-radius: 20%; */
        /* background-color: #000; */
        background-image: url('../assets/stats-image.jpg');
        background-position: 40% 50%;
        bottom: 0px;
        position: absolute;
        box-shadow: 5px 5px 8px 0px rgba(0,0,0,0.9);
    }

    .name {
        position: relative;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 60px;
        background-color: rgba(128, 128, 128, 0.404);
        /* border-radius: 5px; */
        border-bottom-left-radius: 20%;
        border-bottom-right-radius: 20%;
        font-size: 20px;
        font-weight: bold;
        /* color: #000; */
        text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
    }

    .category {
        position: absolute;
        top: 80px;
        font-size: 20px;
        font-weight: bold;
        /* color: #000; */
        text-shadow: 0 0 5px #000, 0 0 10px #000, 0 0 15px #000, 0 0 20px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff;
    }
    
    .value {
        position: absolute;
        right: 15px;
        top: 80px;
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
        margin-left: 20px;
        text-align: left;
        
    }
</style>