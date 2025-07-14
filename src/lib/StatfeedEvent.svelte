<script>
  import InlineSvg from './InlineSvg.svelte';
  export let event;

  function getImage(eventName) {
    if (!eventName) return '';
    const safeName = eventName.toLowerCase().replace(/\s+/g, '_');
    return `/stat-icons/${safeName}.svg`;
  }

  function hexToRgba(hex, alpha = 0.7) {
    if (!hex || hex.length !== 6) return `rgba(0, 0, 0, ${alpha})`;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
</script>

<div
  class="statfeed-container"
  style="background-color: {hexToRgba(event.teamColor)}"
>
  <div class="statfeed-icon">
    <InlineSvg src={getImage(event.event)} />
  </div>
  <p class="statfeed-text">
    <strong>{event.name}</strong>
  </p>
</div>

<style>
  .statfeed-container {
    padding: 0px 8px;
    margin-bottom: 2px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease-out;
    z-index: 999;
    justify-content: start;
    height: 40px;
  }

  .statfeed-icon {
    filter: brightness(0) invert(1);
    width: 50px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :global(.statfeed-icon svg) {
    width: 100%;
    height: 100%;
  }

  .statfeed-text {
    font-size: 20px;
    color: white;
    font-weight: bold;
    text-shadow: 0 0 4px black;
    margin: 0px 30px 0px 30px;
  }

  @keyframes slideIn {
    from {
      transform: translateX(50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>