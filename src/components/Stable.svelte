<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { Button } from "svelma-pro";

  const dispatch = createEventDispatcher();

  export let checkbox = false; // 是否选择  checkbox  radio   false
  let checkAllBtn = false;
  let checkArr = [];
  export let radioRow = {};
  export let loading = true;
  export let noDataTip = "No data";
  // 自定义属性
  export let fullwidth = true;
  export let bordered = true; //为所有单元格添加边框。
  export let hoverable = true; //您可以在每行上添加悬停效果
  export let striped = true; // 在表中添加条纹。
  export let narrow = false; //使单元格变窄。
  export let custom = false; //自定义列
  export let tWidth = "100%"; //宽度
  export let tHeight = "100%"; //高度
  export let fixedHeader = true; // 固定表头
  export let activedRowKey = [];
  export let key = "drone_model_id";

  export let columns;
  export let rows;
  export let sortBy = "";
  export let sortOrder = 1;
  export let iconAsc = "▲";
  export let iconDesc = "▼";
  export let classNameTable = "";
  export let classNameThead = "";
  export let classNameTbody = "";
  export let classNameSelect = "";
  export let classNameRow = "";
  export let classNameCell = "";

  let theadObj = null;
  let tbodyObj = null;
  let theadHeight = 0;
  let tbodyOffset = 0;

  $: {
    if (theadObj) {
      theadHeight = theadObj.clientHeight;
    }
  }

  $: {
    if (tbodyObj && tbodyObj.clientWidth < tbodyObj.offsetWidth) {
      tbodyOffset = 5;
    }
  }

  $: {
    const select = [];
    checkArr.map((item, index) => {
      if (item && !rows[index]["disabled"]) select.push(rows[index]);
    });

    if (select.length === rows.length && select.length !== 0) {
      checkAllBtn = true;
    } else {
      checkAllBtn = false;
    }

    if (checkbox === "checkbox" || checkbox === true) {
      dispatch("checked", select);
    }
  }

  function selectAll(e) {
    if (e.target.checked) {
      for (let i = 0; i < rows.length; i++) {
        checkArr[i] = true;
      }
    } else {
      checkArr = [];
    }
  }

  function selectRadio(row) {
    radioRow = row;
    dispatch("checked", row);
  }

  function checked(e) {
    // checkAllBtn = false;
  }

  let sortFunction = () => "";
  let showFilterHeader = columns.some((c) => c.filterOptions !== undefined);
  let filterValues = {};
  let filterSettings = {};
  let columnByKey = {};

  const customComponentKeys = [];

  columns.forEach((col) => {
    columnByKey[col.key] = col;
    if (col.components) {
      customComponentKeys.push(col.key);
    }
  });

  let c_rows = [];
  let firstEnter = true;
  $: {
    if (c_rows && c_rows.length === 0) {
      if (firstEnter) {
        firstEnter = false;
      } else {
        loading = false;
      }
    }
  }

  let copyRows = "";
  $: {
    // if (checkbox === "checkbox" || checkbox === true) {
    //   let dataChange = false;
    //   for (let k in checkArr) {
    //     if (
    //       checkArr[k] &&
    //       rows[k] &&
    //       rows[k][key] &&
    //       c_rows[k][key] !== rows[k][key]
    //     ) {
    //       dataChange = true;
    //       break;
    //     }
    //   }

    //   if (c_rows.length > rows.length || dataChange) {
    //     checkArr = [];
    //     checkAllBtn = false;
    //   }
    // }

    if (copyRows === JSON.stringify(rows)) {
      // console.log('没')
    } else {
      checkArr = [];
      checkAllBtn = false;
      radioRow = {};
    }

    copyRows = JSON.stringify(rows);

    // if (checkbox === "radio") {

    // }

    c_rows = rows
      .filter((r) =>
        Object.keys(filterSettings).every((f) => {
          let ret =
            filterSettings[f] === undefined ||
            // default to value() if filterValue() not provided in col
            filterSettings[f] ===
              (typeof columnByKey[f].filterValue === "function"
                ? columnByKey[f].filterValue(r)
                : columnByKey[f].value(r));
          return ret;
        })
      )
      .map((r) => {
        return Object.assign({}, r, {
          $sortOn: sortFunction(r),
        });
      })
      .sort((a, b) => {
        if (a.$sortOn > b.$sortOn) return sortOrder;
        else if (a.$sortOn < b.$sortOn) return -sortOrder;
        return 0;
      });
  }
  const asStringArray = (v) =>
    []
      .concat(v)
      .filter((v) => typeof v === "string" && v !== "")
      .join(" ");

  const calculateFilterValues = () => {
    filterValues = {};
    columns.forEach((c) => {
      if (typeof c.filterOptions === "function") {
        filterValues[c.key] = c.filterOptions(rows);
      } else if (Array.isArray(c.filterOptions)) {
        // if array of strings is provided, use it for name and value
        filterValues[c.key] = c.filterOptions.map((val) => ({
          name: val,
          value: val,
        }));
      }
    });
  };

  $: {
    let col = columnByKey[sortBy];
    if (col !== undefined && col.sortable === true) {
      sortFunction = (r) => r[col.key];
    }
  }

  $: {
    // if filters are enabled, watch rows and columns
    if (showFilterHeader && columns && rows) {
      calculateFilterValues();
    }
  }

  const updateSortOrder = (colKey) => {
    if (colKey === sortBy) {
      sortOrder = sortOrder === 1 ? -1 : 1;
    } else {
      sortOrder = 1;
    }
  };

  /**
   * 头标题点击事件
   * @date 2020-10-07
   * @param {any} event 事件
   * @param {any} col   头配置
   * @returns {any}
   */
  const handleClickCol = (event, col) => {
    if (col.sortable) {
      updateSortOrder(col.key);
      sortBy = col.key;
    }

    dispatch("clickCol", {
      event,
      col,
      key: col.key,
    });
  };

  /**
   * 行点击事件
   * @date 2020-10-07
   * @param {any} event
   * @param {any} row  行数据
   * @returns {any}
   */
  const handleClickRow = (event, row) => {
    dispatch("clickRow", {
      event,
      row,
    });
  };

  /**
   * 单元格点击事件
   * @date 2020-10-07
   * @param {any} event
   * @param {any} row 行数据
   * @param {any} key  当前单元格key
   * @returns {any}
   */
  const handleClickCell = (event, row, key) => {
    dispatch("clickCell", {
      event,
      row,
      key,
    });
  };

  onMount(() => {
    setTimeout(() => {
      if (loading) {
        loading = false;
      }
    }, 30000);
  });
</script>

<style lang="scss">
  $scrollbar-track-bg: rgb(239, 239, 239);
  $stable-nodata-icon: rgb(239, 239, 239);

  #smx-stable {
    width: 100%;
    height: 100%;
    overflow: auto;
    .section {
      padding: 1.5rem;
    }

    .nodata {
      .icon {
        color: $stable-nodata-icon;
      }

      .font {
        color: $stable-nodata-icon;
      }
    }
    .nodata:hover {
      background-color: initial;
    }

    .isSortable {
      cursor: pointer;
    }

    tr th select {
      width: 100%;
    }

    .fixedHeader {
      // min-height: 200px;
      tbody {
        display: block;
        height: 100%;
        overflow-y: auto;
      }

      thead,
      tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }

      td,
      th {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
      }

      thead {
        width: 100%;
        position: relative;

        .thead_offset {
          position: absolute;
          right: -5px;
          background: $scrollbar-track-bg;
          height: 100%;
          width: 5px;
        }
      }
    }
    tbody::-webkit-scrollbar,
    thead::-webkit-scrollbar {
      width: 5px;
    }
    tbody::-webkit-scrollbar-track,
    thead::-webkit-scrollbar-track {
      background: $scrollbar-track-bg;
      border-radius: 2px;
    }
    tbody::-webkit-scrollbar-thumb,
    thead::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 10px;
    }
    tbody::-webkit-scrollbar-thumb:hover,
    thead::-webkit-scrollbar-thumb:hover {
      background: #333;
    }
    tbody::-webkit-scrollbar-corner,
    thead::-webkit-scrollbar-corner {
      background: #179a16;
    }
  }
</style>

<div id="smx-stable">
  <table
    style="min-width:{c_rows.length > 0 ? tWidth : '100%'}; height: {tHeight}"
    class="table stable {fullwidth ? 'is-fullwidth' : ''}
    {narrow ? 'is-narrow' : ''}
    {striped ? 'is-striped' : ''}
    {bordered ? 'is-bordered' : ''}
    {hoverable ? 'is-hoverable' : ''}
    {fixedHeader ? 'fixedHeader' : ''}
    {asStringArray(classNameTable)}">
    <thead
      class={asStringArray(classNameThead)}
      bind:this={theadObj}
      style="width: calc(100% - {tbodyOffset}px)">
      {#if tbodyOffset}
        <div class="thead_offset" />
      {/if}
      {#if showFilterHeader}
        <tr>
          {#if checkbox}
            <th
              style="text-align: center;width: 50px"
              on:click={(e) => e.stopPropagation()} />
          {/if}
          {#each columns as col}
            <th>
              {#if filterValues[col.key] !== undefined}
                <select
                  bind:value={filterSettings[col.key]}
                  class={asStringArray(classNameSelect)}>
                  <option value={undefined} />
                  {#each filterValues[col.key] as option}
                    <option value={option.value}>{option.name}</option>
                  {/each}
                </select>
              {/if}
            </th>
          {/each}
        </tr>
      {/if}
      <tr>
        {#if checkbox}
          <th
            style="text-align: center;width: 50px"
            on:click={(e) => e.stopPropagation()}>
            {#if checkbox === 'radio'}
              <!-- <input
                style="vertical-align: middle;"
                type="checkbox"
                on:click={e => selectAll(e)}
                bind:checked={checkAllBtn} /> -->
            {:else}
              <input
                style="vertical-align: middle;"
                type="checkbox"
                on:click={(e) => selectAll(e)}
                bind:checked={checkAllBtn} />
            {/if}
          </th>
        {/if}
        {#each columns as col}
          <th
            style="text-align: {col.align ? col.align : 'center'};width: {col.width && c_rows.length > 0 ? col.width : ''}"
            on:click={(e) => handleClickCol(e, col)}
            title={col.title}
            class={asStringArray([
              col.sortable ? 'isSortable' : null,
              col.headerClass,
            ])}>
            {col.title}
            {#if sortBy === col.key}{sortOrder === 1 ? iconAsc : iconDesc}{/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody
      bind:this={tbodyObj}
      class={asStringArray(classNameTbody)}
      style="height: calc(100% - {theadHeight}px)">
      {#each c_rows as row, n}
        <tr
          class="{asStringArray(classNameRow)}{activedRowKey.includes(row[key]) ? ' is-selected' : ''}"
          on:click={(e) => {
            handleClickRow(e, row);
          }}>
          {#if checkbox}
            <td
              style="text-align: center;width: 50px"
              on:click={(e) => e.stopPropagation()}>
              {#if !row['disabled']}
                {#if checkbox === 'radio'}
                  <input
                    style="vertical-align: middle;"
                    on:click={(event) => selectRadio(row)}
                    type="radio"
                    checked={radioRow[key] === row[key]} />
                {:else}
                  <input
                    style="vertical-align: middle;"
                    on:click={(event) => checked(event, n)}
                    type="checkbox"
                    bind:checked={checkArr[n]} />
                {/if}
              {/if}
            </td>
          {/if}
          {#each columns as col}
            <td
              style="text-align: {col.align ? col.align : 'center'};width: {col.width && c_rows.length > 0 ? col.width : ''}"
              on:click={(e) => {
                handleClickCell(e, row, col.key);
              }}
              title={col.renderValue ? "" : row[col.key]}
              class={asStringArray([col.class, classNameCell])}>
              {#if custom}
                <slot name="col" />
              {:else if col.component}
                <slot name="component" {row} />
              {:else}
                {@html col.renderValue ? col.renderValue(row) : row[col.key]}
              {/if}
            </td>
          {/each}
        </tr>
      {:else}
        <tr style="height: 100%" class="nodata">
          <td style="height: 100%;position:relative">
            <section class="section">
              <div class="content has-text-grey has-text-centered">
                {#if loading}
                  <p class="font">数据加载中</p>
                  <Button
                    loading
                    style="background: unset; position: absolute; top: 50%; left: 50%; transform: translateX(-50%); border: 0;" />
                {:else}
                  <p class="icon"><i class="far fa-3x fa-frown" /></p>
                  <p class="font">{noDataTip}</p>
                {/if}
              </div>
            </section>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
