<script>
    export let percent = 33;

    // $: console.log(percent);
</script>

<div class="boost team0bg">
    <div class="boost bg">
        <div class="boost" style="width: {percent}%" />
    </div>
</div>

<style>
    .boost {
        position: relative;
        height: 50px;
        background-color: pink;
    }

    .bg {
        width: 300px;
        background-color: #000288;
    }
</style>