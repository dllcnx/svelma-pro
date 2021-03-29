<script>
  import { onMount } from "svelte";
  let sider;
  export let width = "200px";
  export let bgcolor = "auto";

  onMount(() => {
    if (sider && sider.parentNode.classList["0"] === "smx-layout") {
      sider.parentNode.style.flexDirection = "row";
    }
  });
</script>

<style lang="scss">
  @import "./Layout.scss";

  .smx-layout-sider-children {
      height: 100%;
      margin-top: -0.1px;
      padding-top: 0.1px;
    }
</style>

<div class="smx-layout-sider" bind:this={sider} style="width: {width};min-width: {width};background: {bgcolor}">
  <div class="smx-layout-sider-children">
    <slot />
  </div>
</div>
