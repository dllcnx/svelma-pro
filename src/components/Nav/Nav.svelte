<script>
  import NavItem from './NavItem.svelte'
  import { setContext } from 'svelte'
  export let height = 'auto'
  export let logoImg = '/logo.png'
  export let logoUrl = '/'
  export let logoH = 'auto'
  export let logoW = "40px";
  export let background = 'rgb(242, 242, 242)'
  export let logoShow = true;
  setContext('logoW', logoW)
  $: if (!logoShow) {
    logoW = 0
  }
  // export let navPosition = "center"; // center start
</script>

<style>
  nav {
    /* border-bottom: 1px solid rgb(242, 242, 242);; */
    font-weight: 300;
    padding: 0 1em;
    position: absolute;
    top: 0;
    z-index: 10;
    color: #fff;
    width: 100%;
    background-size: 100% 100%;
  }
  .navbar-img {
    max-height: 200px;
  }
</style>

<nav class="navbar" style="height: {height};background: {background}">
  {#if logoShow}
    <div class="navbar-brand">
      <a class="navbar-item" href={logoUrl}>
        <img class="navbar-img" style="width: {logoW};height: {logoH}" src={logoImg} alt="logo" />
      </a>
    </div>
  {/if}
  <div id="navMenubd-example" class="navbar-menu">
    <slot logoW={logoW} />
  </div>
</nav>
