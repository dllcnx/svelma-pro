<style>
  .color-square{
    width: 100%;
    height: 100%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQoU2N88eLFfwY0ICEhwYguxjgUFKI7GsTH5m4M3w1ChQCnziae7MntdQAAAABJRU5ErkJggg==);
    background-repeat: repeat;
    background-size: 50% auto;
  }

  .color-square-in{
    width: 100%;
    height: 100%;
  }
</style>

<script>
  export let color;
</script>

<div class="color-square">
  <div class="color-square-in" style="background: {color}"></div>
</div>