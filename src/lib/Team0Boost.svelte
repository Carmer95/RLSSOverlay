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
    .boost {
        position: relative;
        height: 25px;
        background-color: pink;
        border-radius: 13px 13px 13px 13px;
        overflow: hidden;
    }

    .bg {
        width: 300px;
        background-color: #000288;
        box-shadow: -2px 1px 8px 0px rgba(0,0,0,0.9);
        border-radius: 13px 13px 13px 13px;
    }
</style>