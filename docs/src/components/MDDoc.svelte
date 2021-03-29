<script>
  export let html;
</script>

<style lang="scss">
  :global(#smx-md-doc) {
    :global(h1, h2, h3, h4, h5, h6) {
      font-size: initial;
      font-weight: bold;
      margin: 30px 0;
    }

    :global(table) {
      width: 100%;
      background: #fff;
      border: solid 1px #ddd;
      margin-bottom: 1.25rem;
      table-layout: auto;
    }

    :global(td, th) {
      border: 1px solid #dbdbdb;
      border-width: 0 0 1px;
      padding: 0.5em 0.75em;
      vertical-align: top;
    }

    :global(ul) {
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.6;
      list-style-position: outside;
      margin-bottom: 1.25rem;
      margin-left: 1.1rem;
      list-style: initial;
    }
  }
</style>

<div id="smx-md-doc">
  {@html html}
</div>
