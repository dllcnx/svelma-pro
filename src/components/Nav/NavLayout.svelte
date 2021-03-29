<script>
  import { getContext } from 'svelte'
  export let navPosition = "center"; // center start  end
  const logoW = getContext('logoW')
</script>

<style>
  .navbar-center {
    margin: auto;
    position: relative;
  }
  .navbar-end {
    position: absolute;
    height: 100%;
    right: 0;
  }
</style>

{#if navPosition === 'center'}
  <div
    class="navbar-start navbar-center"
    style="right:calc(0.75rem + ({logoW} /2))">
    <slot />
  </div>
{:else if navPosition === 'end'}
  <div class="navbar-end">
    <slot />
  </div>
{:else}
  <div class="navbar-start">
    <slot />
  </div>
{/if}
