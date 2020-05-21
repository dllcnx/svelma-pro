<style>
  .saturation-value{
    height: calc(100% / 1.618); /* NUMERO AUREO */
    position: relative;
    overflow: hidden;
  }

  .saturation, .value{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .saturation{
    background: linear-gradient(to right, #fff, rgba(255,255,255,0));
  }

  .value{
    background: linear-gradient(to top, #000, rgba(0,0,0,0));
  }

  .pointer{
    box-sizing: border-box;
    width: 15px;
    height: 15px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    box-shadow: rgba(255,255,255,1) 0 0 2px 2px inset, rgba(0,0,0,0.2) 0 0 2px 2px;
    position: absolute;
  }
</style>

<script>
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  // input, inputstart, inputend {s, v}

  import {limitatePercent} from "./utils.js";

  let className = "";
  export {className as class};

  export let h = 180;
  export let s = 0;
  export let v = 0;

  $: pureColor = `hsl(${h}, 100%, 50%)` 
  
  // DOM
  let square;
  let pointer;

  $: pointerX = s;
  $: pointerY = -(v - 1);  // v = 1 - x // x = -(v - 1)

  let pointerOffsetX = 0;
  let pointerOffsetY = 0;

  const handleMousemove = (event) => {
    const {x, y, width, height} = square.getBoundingClientRect();
    s = limitatePercent((event.x - x + pointerOffsetX) / width);
    v = 1 - limitatePercent((event.y - y + pointerOffsetY) / height);
    dispatch("input", {s, v});
  }

  const startMove = () => {
    //dispatch("inputstart", {s, v})
    handleMousemove(event);
    self.addEventListener("mousemove", handleMousemove);
    self.addEventListener("mouseup", handleMouseup);
  }

  const handleMouseup = () => {
    self.removeEventListener("mousemove", handleMousemove);
    self.removeEventListener("mouseup", handleMouseup);
    //dispatch("inputend", {s, v});
  }

  const handlePointerMousedown = (event) => {
    const {x, y, width, height} = pointer.getBoundingClientRect();
    pointerOffsetX = (width / 2) - (event.x - x);
    pointerOffsetY = (height / 2) - (event.y - y);
    startMove(event);
  }

  const handleSquareMousedown = (event) => {
    pointerOffsetX = pointerOffsetY = 0;
    startMove(event);
  }
</script>

<div
  class="saturation-value {className}"
  bind:this={square}
  style="background-color: {pureColor}"
  on:mousedown|preventDefault={handleSquareMousedown}
>  
  <div class="saturation"></div>
  <div class="value"></div>
  <div 
    class="pointer"
    bind:this={pointer}
    on:mousedown|preventDefault|stopPropagation={handlePointerMousedown}
    style="left: {pointerX * 100}%; top: {pointerY * 100}%"
  ></div>
</div>