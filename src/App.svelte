<script>
  import Boost from "./lib/Boost.svelte";
  import { targetPlayer } from "./lib/Processor";
  import { socketMessageStore } from "./lib/socket";
</script>

<main>
    {#if $targetPlayer?.name}
  <Boost percent="{$targetPlayer.boost}" />
  {/if}

  <!-- 
  The {#if $targetPlayer?.name} does three things:

  It always has the latest value contained by the targetPlayer Svelte store because we have added a $ to the front. This only works in .svelte files.
  It checks $targetPlayer is not undefined (that’s what the ? before the . is doing)
  It checks that whatever $targetPlayer is, it has a name property that is “truthy” (so not undefined or "") 
  -->
</main>

<style>
</style>
