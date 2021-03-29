<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let current = false;
  export let page = 1;
  let total = 10;
  let show = 3;
  let showEllipsis = true;

  let disabled = false;
  $: {
    if (Number(current) === 1 && Number(page) === 1) {
      disabled = true;
    }
    if (Number(current) === Number(total) && Number(page) === Number(total)) {
      disabled = true;
    }
    disabled = false;
  }

  function noop(event) {
    event.preventDefault();
  }
  function goto(event, page) {
    event.preventDefault();
    current = page;
    dispatch("change", page);
  }
</script>

<li>
  {#if disabled}
    <a href="/" class="pagination-link" disabled>{page}</a>
  {:else if current == page}
    <a
      href="/"
      class="pagination-link is-current"
      aria-label="Page {page}"
      aria-current="page"
      on:click={event => noop(event)}>
      {page}
    </a>
  {:else}
    <a
      href="/"
      class="pagination-link"
      aria-label="Goto page {page}"
      on:click={event => goto(event, page)}>
      {page}
    </a>
  {/if}
</li>
