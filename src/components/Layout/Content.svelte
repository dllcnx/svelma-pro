<script>
  export let height = "auto";
  export let width = "auto";
  export let bgcolor = "auto";
</script>

<style lang="scss">
  @import "./Layout.scss";
</style>

<div class="smx-layout-content" style="height: {height};width: {width};background: {bgcolor}">
  <slot />
</div>
