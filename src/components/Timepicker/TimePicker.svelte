<script>
  import Switcher from "./Switcher.svelte";
  import { createEventDispatcher } from "svelte";
  import Input from "../Input.svelte";

  const dispatch = createEventDispatcher();

  export let width = "100%";
  export let hour12 = false; // 是否12进制
  export let align = "left";
  export let icon = true;
  export let disabled = false;
  export let inputClass = "";
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
  let hourNum = hour12 ? 12 : 24;
  const HOURS = new Array(hourNum).fill(1).map((v, i) => {
    let t = hour12 ? v + i : i;
    if (hour12) {
      let t = v + i;
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    } else {
      let t = i;
      if (t < 10) {
        return "0" + t;
      } else {
        return t;
      }
    }
  });
  const MINUTES = new Array(60).fill(1).map((v, i) => {
    let t = i;
    if (t < 10) {
      return "0" + t;
    } else {
      return t;
    }
  });
  const SECONDS = new Array(60).fill(1).map((v, i) => {
    let t = i;
    if (t < 10) {
      return "0" + t;
    } else {
      return t;
    }
  });

  export let i18n = "ZH";
  let language = i18n === "ZH" ? "zh-CN" : "en-US";
  const MERIDIEM = ["AM", "PM"];

  export let time = new Date();
  let _time, selectedHour, selectedMeridiem;
  let visible = false;
  export const classes = "";

  let resetTime = (event) => {
    event.stopPropagation();
    time = new Date();
  };

  $: {
    _time = time.toLocaleTimeString(language, { hour12: hour12 });
    const sh = +time
      .toLocaleTimeString("en-US", { hour12: hour12, hour: "numeric" })
      .split(" ")[0];

    if (hour12) {
      selectedHour = sh;
      selectedMeridiem = time.getHours() < 12 ? 1 : 2;
    } else {
      selectedHour = sh === 24 ? 0 : sh;
    }
  }

  let changeStatus = false;
  let timeChanged = (event) => {
    let { type, changedData } = event.detail;
    let newTime = new Date();
    if (type === "hours") {
      if (hour12) {
        let thresholdHour = selectedMeridiem === 2 ? 13 : 1;
        newTime.setHours(changedData + thresholdHour);
        if (changedData === 12) {
          changeStatus = true;
          setTimeout(() => {
            const btn = document.getElementById("Meridiem");
            btn.click();
          });
        }
      } else {
        newTime.setHours(changedData);
      }

      newTime.setMinutes(time.getMinutes());
      newTime.setSeconds(time.getSeconds());
    }

    if (type === "minutes") {
      newTime.setHours(time.getHours());
      newTime.setMinutes(changedData);
      newTime.setSeconds(time.getSeconds());
    }

    if (type === "seconds") {
      newTime.setHours(time.getHours());
      newTime.setMinutes(time.getMinutes());
      newTime.setSeconds(changedData);
    }

    if (type === "meridiem") {
      let thresholdHour = ~~changedData ? 12 : ~11;
      newTime.setHours(time.getHours() + thresholdHour);
      newTime.setMinutes(time.getMinutes());
      newTime.setSeconds(time.getSeconds());
    }

    time = newTime;

    const data = {
      time: time.toLocaleTimeString(language, { hour12: hour12 }),
      timeStamp: time.getTime(),
    };
    dispatch("timeChecked", data);
  };

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
  .touch-time-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: var(--svtt-font-size, 20px);
    padding: 1rem;
    border: 1px solid #ededf0;
    border-radius: 2px;
    -webkit-box-shadow: 0px 1px #ededf0;
    box-shadow: 0px 1px #ededf0;
    width: 300px;
    position: absolute;
    z-index: 10;
    background-color: #fff;
  }

  .touch-time-picker {
    display: flex;
    padding: 50px 20px;
    margin: 10px 0;
    overflow: hidden;
  }

  /* .touch-time-reset > button {
    width: 100px;
    height: 30px;
    border-radius: 15px;
    border: var(--svtt-border, 1px solid grey);
    outline: none;
    color: var(--svtt-button-color, black);
    background-color: var(--svtt-button-bg-color, transparent);
    box-shadow: var(--svtt-button-box-shadow, none);
    font-weight: 300;
  }
  .touch-time-reset button:nth-child(1):active {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
  } */

  .touch-time {
    /* font-size: 30px;
    font-weight: 300; */
    font-size: 20px;
    font-weight: 500;
  }
  /* .dp-input {
    margin: 5px 0 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    padding-left: 30px;
  } */
  /* .date-icon {
    height: 40px;
    display: inline-block;
    width: 40px;
    position: absolute;
    bottom: 0;
    left: 10px;
    line-height: 40px;
  } */
</style>

<!-- <svelte:window on:click={windowClick} /> -->
<div style="width: {width};position: relative">
  <div
    style="position: relative"
    on:click={(e) => {
      e.stopPropagation();
      disabled ? '' : (visible = !visible);
    }}>
    <!-- <input
      class="dp-input input is-primary"
      type="text"
      readonly
      value={_time}
      on:click={() => {
        visible = !visible
      }} />
    <span class="fa fa-clock date-icon" /> -->
    <Input
      type="text"
      {disabled}
      class={inputClass}
      bind:value={_time}
      id={inputObj}
      on:blur={windowClick}
      readonly
      iconPack="fa"
      icon={icon ? 'clock' : ''} />
  </div>
  {#if visible}
    <div class="touch-time-wrapper" style="left: {left}" on:click={panelClick}>
      <div class="touch-time">{_time}</div>
      <div class="touch-time-picker">
        <Switcher
          type="hours"
          data={HOURS}
          selected={selectedHour}
          on:timeChange={timeChanged}
          {hour12} />
        <Switcher
          type="minutes"
          data={MINUTES}
          selected={time.getMinutes()}
          on:timeChange={timeChanged} />
        <Switcher
          type="seconds"
          data={SECONDS}
          selected={time.getSeconds()}
          on:timeChange={timeChanged} />
        {#if hour12}
          <Switcher
            type="meridiem"
            data={MERIDIEM}
            selected={selectedMeridiem}
            on:timeChange={timeChanged}
            addId="Meridiem" />
        {/if}
      </div>
      <!-- <div class="touch-time-reset">
        <button on:click={resetTime}>Reset</button>
        <button
          on:click={() => {
            visible = !visible
          }}>
          Ok
        </button>
      </div> -->
    </div>
  {/if}
</div>
