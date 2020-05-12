<script>
  export let isHover = false
</script>

<style>
  .navbar-item.has-dropdown:focus .navbar-link,
  .navbar-item.has-dropdown:hover .navbar-link,
  .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: unset;
  }
</style>

{#if isHover}
  <div class="navbar-item has-dropdown is-hoverable">
    <div class="navbar-link">
      <slot />
    </div>

    <div id="moreDropdown" class="navbar-dropdown ">
      <slot name="hover" />
    </div>

  </div>
{:else}
  <div class="navbar-item">

    <slot />
  </div>
{/if}
