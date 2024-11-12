<script>
    export let percent = 33;
</script>

<div class="circular-boost">
    <div class="circle">
        <div class="progress-circle" style="background: conic-gradient(from 180deg, rgb(255, 255, 0) {percent * 2.7}deg, #ddd {percent * 2.7}deg);">
        </div>
    </div>
</div>

<div class="inside-circle">
</div>


<div class="boost-value">
    {percent}
</div>

<style>
    .circular-boost {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 240px;
        height: 240px;
        z-index: 1;
        position: absolute;
    }

    .circle {
        width: 244px;
        height: 244px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        clip-path: polygon(50% 50%, 
                   50% 100%,
				   0% 100%,
				   0% 0%,
				   100% 0%,
				   100% 50%
				   );
        z-index: 1;
        position: absolute;
    }

    /* Conic gradient progress starting from the bottom middle (180deg) */
    .progress-circle {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: conic-gradient(rgb(255, 255, 0) 180deg, rgb(255, 255, 0) 90deg, rgb(255, 255, 0) 270deg); /* Dynamically updated */
        /* clip-path: polygon(50% 50%, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0); */
        /* clip-path: polygon(50% 50%, 
                   50% 100%,
				   0% 100%,
				   0% 0%,
				   100% 0%,
				   100% 50%
				   ); */
        clip-path: polygon(
                   90% 50%, 
                   89% 42%, 
                   86% 33%, 
                   83% 28%, 
                   79% 23%, 
                   75% 19%, 
                   69% 15%, 
                   64% 13%, 
                   55% 11%, 
                   49% 11%, 
                   40% 12%, 
                   33% 15%, 
                   28% 18%, 
                   22% 23%, 
                   18% 28%, 
                   15% 34%, 
                   12% 41%, 
                   11% 50%, 
                   12% 58%, 
                   14% 65%, 
                   18% 72%, 
                   22% 78%, 
                   28% 83%, 
                   35% 87%, 
                   41% 89%, 
                   46% 90%, 
                   50% 90%, 
                   50% 100%, 
                   16% 100%, 
                   0 81%, 
                   0 52%, 
                   0 25%, 
                   3% 14%, 
                   14% 4%, 
                   32% 0, 
                   54% 0, 
                   74% 0, 
                   86% 2%, 
                   95% 11%, 
                   100% 25%, 
                   100% 50%
        );
        z-index: 1;
        position: absolute;
        opacity: .77;
    }

    /* Inner circle with percentage */
    .inside-circle {
        width: 192px;
        height: 192px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 48px;
        font-weight: bold;
        color: rgb(255, 255, 255);
        opacity: 0.5;
        text-shadow: 0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 0 0 20px #000000, 0 0 30px #000000, 0 0 40px #000000, 0 0 55px #000000, 0 0 75px #000000;
        background-image: url('../assets/hsg-logo.png');
        background-position: 50% 48%;
        background-size: 200%;
        z-index: 2;
        position: absolute;
        top: 25px;
        left: 25px;
    }

    .boost-value {
        position: absolute;
        height: 100%;
        top: 104px;
        z-index: 2;
    }
</style>






<!-- <script>
    export let percent = 33;

    // Calculate the degree of rotation based on the percent value
    $: rotateDegree = percent * 3.6; // 100% equals 360 degrees
</script>

<div class="circular-boost">
    <div class="circle-border">
        <div class="mask full" style="transform: rotate({rotateDegree}deg);"></div>
        <div class="mask half">
            <div class="fill" style="transform: rotate({rotateDegree}deg);"></div>
        </div>
        <div class="inside-circle">
            {percent}%
        </div>
    </div>
</div>

<style>
    .circular-boost {
        position: relative;
        width: 120px;
        height: 120px;
    }

    /* Outer circle that will show progress in the border */
    .circle-border {
        width: 200px;
        height: 200px;
        position: absolute;;
        border-radius: 50%;
        border: 8px solid #ddd; /* Base color for the border */
    }

    /* Progress masks */
    .mask, .fill {
        width: 200px;
        height: 200px;
        position: absolute;
        border-radius: 50%;
        clip: rect(0px, 200px, 200px, 100px);
    }

    .mask {
        border: 8px solid transparent;
    }

    .fill {
        border: 8px solid pink; /* Color of the progress */
        border-radius: 50%;
        clip: rect(0px, 200px, 200px, 100px);
    }

    .mask.full {
        clip: rect(0px, 20px, 200px, 100px);
        border-color: pink;
    }

    .mask.half {
        background-color: transparent;
    }

    /* Inner circle with the percent text */
    .inside-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: white;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: black;
    }
</style> -->





<!-- <script>
    export let percent = 33;

    // Calculate the degree of rotation based on the percent value
    $: rotateDegree = percent * 3.6; // 100% equals 360 degrees
</script>

<div class="circular-boost">
    <div class="circle">
        <div class="mask full" style="transform: rotate({rotateDegree}deg);"></div>
        <div class="mask half">
            <div class="fill" style="transform: rotate({rotateDegree}deg);"></div>
        </div>
        <div class="inside-circle">
            {percent}
        </div>
    </div>
</div>

<style>
    .circular-boost {
        position: absolute;
        width: 100px;
        height: 100px;
    }

    .circle {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #ddd;
        position: relative;
        display: inline-block;
    }

    .mask, .fill {
        width: 100px;
        height: 100px;
        position: absolute;
        border-radius: 50%;
        clip: rect(0px, 100px, 100px, 50px);
    }

    .mask {
        border: 6px solid transparent;
    }

    .fill {
        background-color: pink;
        border-radius: 50%;
        clip: rect(0px, 50px, 100px, 0px);
    }

    .mask.full {
        clip: rect(0px, 50px, 100px, 0px);
        background-color: pink;
    }

    .mask.half {
        background-color: transparent;
    }

    .inside-circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        color: black;
    }
</style> -->








<!-- <script>
    export let percent = 33;

    // $: console.log(percent);
</script>

<div class="boost bg">
    <div class="boost" style="width: {percent}%" />
</div>

<style>
    .boost {
        position: relative;
        height: 50px;
        background-color: pink;
    }

    .bg {
        width: 300px;
        background-color: #000;
    }
</style> -->