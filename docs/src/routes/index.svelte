<script>
  import { Message } from 'svelma-pro'
</script>

<style>
  h1,
  /* figure, */
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  /* figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  } */

  p {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  pre {
    display: inline-flex;
  }
</style>

<svelte:head>
  <title>svelma-pro</title>
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Svelma" />
  <meta property="og:description" content="Bulma components for Svelte" />
</svelte:head>

<div class="hero is-full-height">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">svelma-pro</h1>
      <h2 class="subtitle">基于开源svelma-pro项目扩展而来的组件库,扩展原有功能,新增一些常用组件.</h2>

      <pre>
        <code>$ npm install svelma-pro</code>
      </pre>

      <br />
      <br />

      <p>
        <Message title="Note!" type="is-primary" showClose={false}>
          为了针对svelte市面成熟组件库缺少及组件分散的情况,团队在svelma-pro开源库的基础上定制及扩展团队私有组件库,可以避免大量的引入分散组件导致的模块管理混乱及市面组件无法自定义扩展,升级等问题.
        </Message>
      </p>
    </div>
  </div>
</div>
