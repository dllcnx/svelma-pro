<script>
  import { onMount } from "svelte";
  import Chrome from "./Chrome.svelte";
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
 
  export let color = "#1ec131";
  export let fieldsIndex = 0;   // 0 hex 1 rgba 2 hsla
  export let mode = 1; // 1 input点击模式  2 直接显示
  export let width = "200px";

   let active = false;

   let panelX = 0;
   let panelY = 0;
   let transformX = 0;
  onMount(() => {});

  function openChrome(event) {
    panelX = event.clientX - event.offsetX;;
    panelY = event.clientY;
    transformX = event.target.offsetWidth + 5;
    if (!active) {
      active = true;
    }
  }

  function closeChrome() {
    active = false;
  }

  const handleInput = event => {
    color = event.detail;
    dispatch("change", event.detail);
  };
</script>

<style lang="scss">
  .smx-color-picker {
    width: 100%;
    position: relative;
  }

  .smx-color-picker input{
    width: 100%;
  }

   .smx-color-panel {
      position: fixed;
      z-index: 9999;
    }
</style>
<svelte:window on:click={closeChrome}/>
{#if mode === 1}
<div class="smx-color-picker" style="width: {width}">
  <input
    type="text"
    class="input"
    on:click|stopPropagation={openChrome}
    value={color}
    style="background: {color};"
    readonly />
  {#if active}
    <div class="smx-color-panel" on:click|stopPropagation style="top: {panelY}px;left:{panelX}px;transform: translate({transformX}px, -50%)">
      <Chrome startColor={color} on:input={handleInput} fieldsIndex={fieldsIndex}/>
    </div>
  {/if}
</div>
{:else}
  <Chrome startColor={color} on:input={handleInput} fieldsIndex={fieldsIndex}/>
{/if}

