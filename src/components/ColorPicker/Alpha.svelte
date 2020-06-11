<style>
.alpha{
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQoU2N88eLFfwY0ICEhwYguxjgUFKI7GsTH5m4M3w1ChQCnziae7MntdQAAAABJRU5ErkJggg==);
  background-repeat: repeat;
}

.alpha-in{
  width: 100%;
  height: 100%;
}

.horizontal{
  background-size: auto 100%;
  width: 100%;
}

.vertical{
  background-size: 100% auto;
  height: 100%;
}
</style>

<script>
  import Slider from "./Slider.svelte";

  let className = "";
  export {className as class};
  
  export let a = 1;
  export let vertical = false;
  export let color = "#fff" // style like string

  $: toGradient = vertical ? "bottom" : "right";
  //$: style = `background: linear-gradient(to ${vertical ? "bottom" : "right"}, transparent 0%, ${color} 100%)`;
</script>

<div class="alpha {className}" class:vertical class:horizontal={!vertical}>
  <div class="alpha-in" style="background: linear-gradient(to {toGradient}, transparent 0%, {color} 100%)">
    <Slider bind:value={a} {vertical} on:input on:input={(event) => console.log()} />
  </div>
</div>