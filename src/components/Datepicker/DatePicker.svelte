<script>
  import { setContext, getContext } from "svelte";
  import { writable } from "svelte/store";

  import MonthView from "./View/MonthView.svelte";
  import YearView from "./View/YearView.svelte";
  import DecadeYearView from "./View/DecadeYearView.svelte";
  import Selector from "./Selector/Selector.svelte";

  import { obtainWeeks } from "./main.js";
  import { createEventDispatcher } from "svelte";
  import Input from "../Input.svelte";

  const dispatch = createEventDispatcher();

  export let width = "100%";
  let nowDate = new Date();
  export let i18n = "ZH";

  export let markDate = [];

  export let disableDate = [];

  export let disableDateRule = "piecemeal";

  export let date = nowDate.getTime();

  $: {
    if (!date) {
      date = nowDate.getTime();
    }
  }

  export let pickerRule = "singleChoice";

  export let align = "left";
  export let icon = true;
  export let inputClass = "";
  export let disabled = false;
  let left;
  $: {
    if (align === "center") {
      left = "calc(50% - 150px)";
    } else if (align === "right") {
      left = "calc(100% - 300px)";
    } else {
      left = 0;
    }
  }

  let pickerResult = [];
  let rangePickerResult = "";
  $: {
    if (pickerRule === "rangeChoice") {
      rangePickerResult = pickerResult[0].start + "  ~  " + pickerResult[1].end;
    }
  }

  $: if (date) {
    if (pickerRule === "singleChoice") {
      const dt = new Date(Number(date));
      pickerResult =
        dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    }
    if (pickerRule === "freeChoice") {
      const dts = [];
      if (typeof date === "number" || typeof date === "string") {
        date = [date];
      }
      for (let v of date) {
        const dt = new Date(Number(v));
        const pr =
          dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
        dts.push(pr);
      }
      pickerResult = dts;
    }
    if (pickerRule === "rangeChoice") {
      if (typeof date === "number" || typeof date === "string") {
        date = [{ start: date }, { end: date }];
      }
      const sdt = new Date(Number(date[0].start));
      const edt = new Date(Number(date[1].end));
      const spr =
        sdt.getFullYear() + "-" + (sdt.getMonth() + 1) + "-" + sdt.getDate();
      const epr =
        edt.getFullYear() + "-" + (edt.getMonth() + 1) + "-" + edt.getDate();

      pickerResult = [{ start: spr }, { end: epr }];
    }
  }

  //主题
  export let theme = "light";

  export let calendar = false;
  let visible = calendar ? true : false;

  if (theme !== "light" && theme !== "dark") {
    throw new RangeError(
      `Unexpected value.[ErrorPlace]:Datepicker.porps.theme.`
    );
  }
  if (i18n !== "EN" && i18n !== "ZH") {
    throw new RangeError(
      `Unexpected value.[ErrorPlace]:Datepicker.porps.i18n.`
    );
  }
  if (disableDateRule !== "piecemeal" && disableDateRule !== "range") {
    throw new RangeError(
      `Unexpected value.[ErrorPlace]:Datepicker.porps.disableDateRule.`
    );
  }
  if (
    pickerRule !== "singleChoice" &&
    pickerRule !== "freeChoice" &&
    pickerRule !== "rangeChoice"
  ) {
    throw new RangeError(
      `Unexpected value.[ErrorPlace]:Datepicker.porps.pickerRule.`
    );
  }
  //Initialize to the store
  const viewDate = writable(1);
  const viewMonth = writable(1);
  const viewYear = writable(1920);
  const thisView = writable("m"); //This month:'m' ，this year:'y',ten years:'d'

  //Bind to context
  setContext("theme", theme);
  setContext("nowDate", nowDate);
  setContext("i18n", i18n);
  setContext("viewMonth", nowDate.getMonth() + 1);
  setContext("thisView", thisView);
  setContext("viewYear", viewYear);
  setContext("viewMonth", viewMonth);
  setContext("viewDate", viewDate);
  setContext("markDate", markDate);
  setContext("disableDate", disableDate);
  setContext("disableDateRule", disableDateRule);
  setContext("pickerRule", pickerRule);

  //Reacquire
  let view = getContext("thisView");
  let _year = getContext("viewYear");
  let _month = getContext("viewMonth");
  let _date = getContext("viewDate");

  //Reassign
  $_year = nowDate.getFullYear();
  $_month = nowDate.getMonth() + 1;
  $_date = nowDate.getDate();

  //Obtain weeks
  $: theFirstWeek = obtainWeeks($_year, $_month, $_date).theFirstWeek;
  $: theSecondWeek = obtainWeeks($_year, $_month, $_date).theSecondWeek;
  $: theThirdWeek = obtainWeeks($_year, $_month, $_date).theThirdWeek;
  $: theFourthWeek = obtainWeeks($_year, $_month, $_date).theFourthWeek;
  $: fifthWeek = obtainWeeks($_year, $_month, $_date).fifthWeek;
  $: sixthWeek = obtainWeeks($_year, $_month, $_date).sixthWeek;

  function checked(e) {
    date = e.detail.timeStamp;
    dispatch("dateChecked", e.detail);
  }

  function windowClick() {
    setTimeout(() => {
      visible = panelClickStatus ? false : true;
      panelClickStatus = true;
    }, 200);
  }

  let inputObj = new Date().getTime();
  let panelClickStatus = true;
  function panelClick() {
    let obj = document.getElementById(inputObj);
    if (obj) {
      panelClickStatus = false;
      obj.focus();
    }
  }
</script>

<style>
  .calendar_light,
  .calendar_dark {
    background-color: #ffffff;
    /* width: 100%; */
    height: 245px;
    /* padding: 8px 6px 8px 6px; */
    /* margin: 5px; */
    border: 1px solid #ededf0;
    border-radius: 2px;
    box-shadow: 0px 1px #ededf0;
    position: absolute;
    z-index: 9;
  }

  .calendar_dark {
    background-color: #141416;
    border: 1px solid #0f1126;
    box-shadow: 0px 1px #0f1126;
  }

  .dp-input {
    margin: 5px 0 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    padding-left: 30px;
  }
  .date-icon {
    height: 40px;
    display: inline-block;
    width: 40px;
    position: absolute;
    bottom: 0;
    left: 10px;
    line-height: 40px;
  }

  .range-input {
    width: 50%;
    display: inline-block;
  }

  /* .input.left,
  .input.left:focus,
  .input.left:hover
  .input.left:active {
    border-right: 0;
    border-color: #dbdbdb !important;
    box-shadow: none !important;
  }

  .input.right,
  .input.right:focus,
  .input.right:hover,
  .input.right:active {
    border-left: 0;
    border-color: #dbdbdb !important;
    box-shadow: none !important;
  } */
</style>

<!-- <svelte:window on:click={windowClick} /> -->
<div style="width: {width};position: relative">
  {#if !calendar}
    {#if pickerRule === 'rangeChoice'}
      <div
        style="position: relative;margin: 5px 0 0 0;"
        on:click={(e) => {
          e.stopPropagation();
          disabled ? '' : (visible = !visible);
        }}>
        <Input
          type="text"
          {disabled}
          class={inputClass}
          id={inputObj}
          on:blur={windowClick}
          bind:value={rangePickerResult}
          readonly
          iconPack="fa"
          icon={icon ? 'calendar' : ''} />
      </div>
    {:else}
      <div
        style="position: relative;margin: 5px 0 0 0;"
        on:click={(e) => {
          e.stopPropagation();
          disabled ? '' : (visible = !visible);
        }}>
        <Input
          type="text"
          {disabled}
          class={inputClass}
          id={inputObj}
          on:blur={windowClick}
          bind:value={pickerResult}
          readonly
          iconPack="fa"
          icon={icon ? 'calendar' : ''} />
        <!-- <span class="fa fa-calendar date-icon" /> -->
      </div>
    {/if}
  {/if}
  {#if visible || calendar}
    <div class={'calendar_' + theme} style="left: {left}" on:click={panelClick}>
      <Selector />
      {#if $view === 'y'}
        <YearView />
      {:else if $view === 'm'}
        <MonthView
          {theFirstWeek}
          {theSecondWeek}
          {theThirdWeek}
          {theFourthWeek}
          {fifthWeek}
          {sixthWeek}
          on:checked={checked}
          bind:result={pickerResult} />
      {:else if $view === 'd'}
        <DecadeYearView />
      {/if}
    </div>
  {/if}
</div>
