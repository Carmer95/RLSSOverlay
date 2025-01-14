<script>
    export let percent = 33;

    // $: console.log(percent);
</script>

<div class="team1bg">
    <div class="boost bg">
        <div class="boost" style="width: {percent}%" />
    </div>
</div>

<style>
    .team1bg {
        height: 50px;
        max-width: 300px;
        margin-bottom: 6px;
    }

    .boost {
        position: relative;
        height: 15px;
        background-color: #ff7300;
        border-radius: 13px 13px 13px 13px;
        overflow: hidden;
    }

    .bg {
        width: 254px;
        background-color: #ffffff;
        border-radius: 13px 13px 13px 13px;
        box-shadow: 2px 1px 8px 0px rgba(0,0,0,0.9);
        direction: rtl;
        top: 73px;
        left: 26px;
    }
</style>