<script>
  import tippy from './index';

  export let content = 'Tip';
  export let config = {
    content: content
  };
</script>

<style>
  span {
    padding: 16px;
    border-radius: 5px;
    background-color: blue;
    color: white;
    cursor: pointer;
  }
</style>

<div use:tippy={config} style="display: inline-block">
  <slot>
    <span class="button is-primary">no elements</span>
  </slot>
</div>
