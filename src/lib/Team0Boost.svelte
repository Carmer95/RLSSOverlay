<script>
    import {  blueTeam } from "../lib/Processor";

    export let percent = 33;
    export let color = $blueTeam.color_primary;

    // console.log(color);
</script>

<div class="team0bg">
    <div class="boost bg">
        <div class="boost" style:width={percent}% style:background-color={color} />
    </div>
</div>

<style>
    .team0bg {
        height: 50px;
        max-width: 256px;
        margin-bottom: 6px;
    }

    .boost {
        position: relative;
        height: 8px;
        background-color: #1873ff;
        border-radius: 13px 13px 13px 13px;
        overflow: hidden;
    }

    .bg {
        width: 256px;
        background-color: #ffffff;
        border-radius: 13px 13px 13px 13px;
        box-shadow: -2px 1px 8px 0px rgba(0,0,0,0.9);
        top: 50px;
        left: 20px;
    }
</style>