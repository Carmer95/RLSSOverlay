<script>
    export let percent = 33;

    // $: console.log(percent);
</script>

<div class="team0bg">
    <div class="boost bg">
        <div class="boost" style="width: {percent}%" />
    </div>
</div>

<style>
    .team0bg {
        height: 50px;
        max-width: 300px;
        margin-bottom: 6px;
    }

    .boost {
        position: relative;
        height: 15px;
        background-color: #000288;
        border-radius: 13px 13px 13px 13px;
        overflow: hidden;
    }

    .bg {
        width: 256px;
        background-color: #ffffff;
        box-shadow: -2px 1px 8px 0px rgba(0,0,0,0.9);
        border-radius: 13px 13px 13px 13px;
        top: 74px;
        left: 20px;
    }
</style>