<style>
.horizontal{
  background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}

.vertical{
  background: linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}
</style>

<script>
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();

  import Slider from "./Slider.svelte";
  
  let className = "";
  export {className as class};

  export let h = 0;
  export let vertical = false;

  export const set = (newValue) => {
    h = newValue;
    sliderValue = newValue / 360; 
  }

  let slider;

  $: sliderValue = h / 360;

  const handle = (event) => {
    h = Math.floor(sliderValue * 360);
    dispatch("input", h);
  }
</script>

<div class="hue {className}" class:vertical class:horizontal={!vertical}>
  <Slider bind:value={sliderValue} {vertical} on:input={handle}/>
</div>