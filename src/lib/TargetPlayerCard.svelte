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
        width: 300px;
        height: 420px;
        background-color: #000;
    }

    .name {
        position: relative;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 80px;
        background-color: gray;
        border-radius: 5px;
    }

    .category {
        position: absolute;
        top: 100px;
    }
    
    .value {
        position: absolute;
        right: 15px;
        margin-top: 15px;
    }

    li {
        list-style-type: none;
        position: relative;
        margin-top: 30px;
        margin-left: 20px;
        text-align: left;
        
    }
</style>