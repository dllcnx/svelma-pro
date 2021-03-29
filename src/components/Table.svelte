<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import Pagination from './Pagination/Pagination.svelte'
  import Icon from './Icon.svelte'
  import { omit } from '../utils'


  const dispatch = createEventDispatcher();

  export let types = ''
  
  export let bodyHeight = '100%'

  export let custom = false

  export let checkbox = false
  
  export let page = false

  export let thead = []
  export let tbody = []
  let rolKey = []


  let checkAll = false
  let checkArr = []

  let loading = false
  let users = []

  const titleize = s => s.replace(/^([a-z])/, (_, r) => r.toUpperCase())

  $: props = {
    // ...omit($$props, 'loading', 'types'),
    class: `table ${types} ${$$props.class || ''}`,
  }
  $: {
    rolKey = []
    for (let key in tbody[0]) {
      rolKey.push(key)
    }
  }

  $: {
    const select = [];
    checkArr.map((item, index) => {
      if (item)
        select.push(tbody[index])
    })
    dispatch('checked', select)
  }

  function selectAll(e) {
    if (e.target.checked) {
      for (let i=0; i<tbody.length; i++) {
        checkArr[i] = true;
      }
    } else {
      // checkArr = checkArr.map((check) => {
      //   return !check;
      // })
      checkArr = []
    }
  }

  function checked(e) {
    checkAll = false;
    
  }

  function scroll(e) {
    const left = e.target.scrollLeft;
    const thead = e.target.parentNode.childNodes[0];
    thead.style.left = -left + 'px';
  }

  onMount(() => {
    // console.log(custom)
    // console.log(props)
  })
</script>

{#if !custom}
  <div class="smx-table-all">
    <div class="smx-table-head">
      <table class="{`table ${types} ${$$props.class || ''}`}" style="margin-bottom: 0">
        <thead>
          <tr>
            {#if checkbox}
              <th>
                <input type="checkbox" on:click={(e) => selectAll(e)} bind:checked={checkAll}>
              </th>
            {/if}
            {#each thead as head}
              <th><span>{head}</span></th>
            {/each}
          </tr>
        </thead>
      </table>
    </div>
    <div class="{bodyHeight != '100%' ? 'smx-table-body' : 'smx-table-flow-x'}" on:scroll={(event) => scroll(event)} style="height: {bodyHeight}">
      <table class="{`table ${types} ${$$props.class || ''}`}">
        <tbody>
          {#each tbody as row, index}
            <tr>
              {#if checkbox}
                <td>
                  <input on:click="{(event) => checked(event, index)}" type="checkbox" bind:checked={checkArr[index]}>
                </td>
              {/if}
              {#each rolKey as key}
                <td title={row[key]}>
                  <span>{row[key]}</span>
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    {#if page}
      <Pagination  current="1" align="centered" show="4" total="{10}" previous="上一页" next="下一页" ></Pagination>
    {/if}
 </div>
{:else}
  <div class="{bodyHeight != '100%' ? 'smx-table-roll' : ''}" style="height: {bodyHeight}">
    <table class="{`table ${types} ${$$props.class || ''}`}">
      <thead>
        <tr>
          {#if checkbox}
            <th>
              <input type="checkbox" on:click={(e) => selectAll(e)} bind:checked={checkAll}>
            </th>
          {/if}
          {#each thead as head}
            <slot name="head" {head}></slot>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each tbody as row, index}
          <tr>
            {#if checkbox}
              <td>
                <input on:click="{(event) => checked(event, index)}" type="checkbox" bind:checked={checkArr[index]}>
              </td>
            {/if}
            {#each rolKey as key}
              <slot name="body" {row} {key} {index}></slot>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  {#if page}
    <Pagination  current="1" align="centered" show="4" total="{10}" previous="上一页" next="下一页" ></Pagination>
  {/if}
{/if}
<style lang="scss">
  .smx-table-all {
    min-width: 600px;
    overflow: hidden;
  }
  .smx-table-roll {
    overflow-y: auto;
    overflow-x: auto;
  }
  .smx-table-head {
    position: relative;
  }
  .smx-table-body {
    overflow-y: auto;
    overflow-x: auto;
  }
  .smx-table-flow-x {
    overflow-x: auto;
  }
  .table {
    td {
      span {
        max-width: 120px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    td:not([align]), th:not([align]) {
      min-width: 150px;
      text-align: center;
    }
    tbody {
      tr:first-child {
        td {
          border-top: none;
        }
      }
    }
  }
</style>


<!-- 
{#if orderTotal * 10 > 10}
        <div class="columns" style="margin-bottom: 0">
          <div class="column is-6">
            <Pagination  current="1" align="centered" show="2" total="{orderTotal}" on:change={e => update(e, orderType)}  previous="上一页" next="下一页" ></Pagination>
          </div>
          <div class="column is-6" style="text-align: right">
            <Button type="is-info" outlined on:click={() => downLoad()} >下载</Button>
          </div>
        </div>
      {:else}
          <div class="columns" style="margin-bottom: 0">
              <div class="column is-6"></div>
              <div class="column is-6" style="text-align: right">
                  <Button type="is-info" outlined on:click={() => downLoad()} >下载</Button>
              </div>
          </div>
      {/if}  -->

<!-- {#each tbody as rows}
      <tr>
        {#each row_key as key}
          <td title={rows[key]}>
            <span>{rows[key]}</span>
          </td>
        {/each}
      </tr>
    {:else}
      {#if !loading}
        <tr>
          <td colspan="5">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                <p>
                  <i class="far fa-3x fa-frown" />
                </p>
                <p>No data</p>
              </div>
            </section>
          </td>
        </tr>
      {/if}
    {/each} -->