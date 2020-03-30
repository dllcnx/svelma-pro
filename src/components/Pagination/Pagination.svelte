<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  import PaginationLink from "./PaginationLink.svelte";
  export let current = 1;
  export let className = "";
  export let total = 10;
  export let show = 5;
  export let noIncremental = false;
  export let noList = false;
  export let align = "";
  export let rounded = false;
  export let size = "";
  export let previous = "pre";
  export let next = "next";

  let currentClass = current ? " is-current" : "";
  let classes;
  $: {
    const classList = ["pagination"];
    align && classList.push(`is-${align}`);
    size && classList.push(`is-${size}`);
    rounded && classList.push("is-rounded");

    classes = classList.join(" ");
  }
  $: showLeft = Number(current) - Math.floor(show / 2);
  $: showRight = Number(current) + Math.floor(show / 2);
  let pages = [];
  $: {
    const list = [];
    for (let i = showLeft; i <= showRight; i++) {
      if (i > 1 && i < total) {
        list.push(i);
      }
    }
    pages = list;
  }

  function goto(event, page) {
    event.preventDefault();
    current = page;
    dispatch("change", { page: page });
  }
  function setPage(event) {
    current = event.detail;
    dispatch("change", { page: current });
  }
</script>

<nav class="{classes} {className}" role="navigation" aria-label="pagination">
  {#if !noIncremental}
    {#if Number(current) === 1}
      <p class="pagination-previous" disabled>{previous}</p>
    {:else}
      <a
        href="/"
        class="pagination-previous"
        on:click={event => goto(event, Number(current) - 1)}>
        {previous}
      </a>
    {/if}
    {#if Number(current) === Number(total)}
      <p class="pagination-next" disabled>{next}</p>
    {:else}
      <a
        href="/"
        class="pagination-next"
        on:click={event => goto(event, Number(current) + 1)}>
        {next}
      </a>
    {/if}
  {/if}
  {#if !noList}
    <ul class="pagination-list">
      <PaginationLink
        page="1"
        {current}
        {total}
        {show}
        on:change={event => setPage(event)} />
      {#if showLeft > 1}
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
      {/if}
      {#each pages as page}
        <PaginationLink
          {page}
          {current}
          {total}
          {show}
          on:change={event => setPage(event)} />
      {/each}
      {#if showRight < Number(total) - 1}
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
      {/if}
      <PaginationLink
        page={total}
        {current}
        {total}
        {show}
        on:change={event => setPage(event)} />
    </ul>
  {/if}
</nav>
