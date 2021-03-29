<style>
.slider{
  position: relative;
}

.horizontal{
  width: 100%;
  height: var(--slider-height, 0.6em);
  --slider-size: var(--slider-height, 0.6em);
}

.vertical{
  height: 100%;
  width: var(--slider-width, 0.6em);
  --slider-size: var(--slider-width, 0.6em);
}

.pointer{
  width: calc(var(--slider-size) * 1.333);
  height: calc(var(--slider-size) * 1.333);
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100000px; /* circle */
  background:#f8f8f8;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37);
}

.horizontal > .pointer{
  left: var(--value);
  transform: translateX(-50%);
  margin-top: calc(var(--slider-size) * -0.25);
}

.vertical > .pointer{
  top: var(--value);
  transform: translateY(-50%);
  margin-left: calc(var(--slider-size) * -0.25);
}
</style>

<script>
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();

  import {limitatePercent} from "./utils.js";

  let className = "";
  export {className as class};

  export let value = 0;
  export let vertical = false;

  export const set = (newValue) => value = newValue;

  let pointerOffsetX = 0;
  let pointerOffsetY = 0;

  let prevValue = value;

  let slider;
  let pointer;

  const handleMousemove = (event) => {
    const {x, y, width, height} = slider.getBoundingClientRect();
    if(vertical){
      value = limitatePercent((event.y - y + pointerOffsetY) / height);
    } else {
      value = limitatePercent((event.x - x + pointerOffsetX) / width);
    }

    if(value !== prevValue){
      prevValue = value;
      dispatch("input", value);    
    }
  }

  const startMove = (event) => {
    handleMousemove(event);
    self.addEventListener("mousemove", handleMousemove);    
    self.addEventListener("mouseup", handleMouseup);
  }

  const handleMouseup = () => {
    self.removeEventListener("mousemove", handleMousemove);
    self.removeEventListener("mousedown", handleMouseup)
  }

  const handleSliderMousemove = (event) => {
    pointerOffsetX = pointerOffsetY = 0;
    startMove(event);
  }

  const handlePointerMousedown = (event) => {
    const {x, y, width, height} = pointer.getBoundingClientRect();
    pointerOffsetX = (width / 2) - (event.x - x);
    pointerOffsetY = (height / 2) - (event.y - y);
    startMove(event);
  }
</script>

<div
  bind:this={slider}
  class="slider {className}"
  class:vertical
  class:horizontal={!vertical}
  on:mousedown|preventDefault={handleSliderMousemove}
>
  <div 
    bind:this={pointer}
    class="pointer"
    on:mousedown|preventDefault|stopPropagation={handlePointerMousedown}
    style="--value: {value * 100}%"
  ></div>
</div>