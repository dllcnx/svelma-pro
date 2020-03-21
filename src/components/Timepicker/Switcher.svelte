<script>
  import { afterUpdate, onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let selected
  export let data = 0
  export let type
  export let hour12
  export let addId = new Date().getTime();

  let position
  if (hour12 || type === 'meridiem') {
    position = selected ? -selected * 50 : 0
  } else {
    position = selected ? -(selected - 1) * 50 : 0
  }

  let offset = 0
  let dragging = false

  let itemWrapper, previousY

  onMount(() => {
    setPosition()
  })

  afterUpdate(() => {
    let selectedPosition
    if (hour12 || type === 'meridiem') {
      selectedPosition = -(selected - 1) * 50
    } else {
      selectedPosition = -selected * 50
    }

    if (!dragging && position !== selectedPosition) {
      position = selectedPosition
      setPosition()
    }
  })

  function onTimeChange(type, changedData) {
    dispatch('timeChange', {
      type,
      changedData,
    })
  }

  function setPosition() {
    let itemPosition = `
      will-change: 'transform';
      transition: transform ${Math.abs(offset) / 100 + 0.1}s;
      transform: translateY(${position}px)
    `
    itemWrapper.style.cssText = itemPosition
  }

  let onMouseDown = event => {
    previousY = event.touches ? event.touches[0].clientY : event.clientY
    dragging = true

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onMouseMove)
    window.addEventListener('touchend', onMouseUp)
  }

  let onMouseMove = event => {
    let clientY = event.touches ? event.touches[0].clientY : event.clientY
    offset = clientY - previousY

    let maxPosition = -data.length * 50
    let _position = position + offset
    position = Math.max(maxPosition, Math.min(50, _position))
    previousY = event.touches ? event.touches[0].clientY : event.clientY
    setPosition()
  }

  let onMouseUp = () => {
    let maxPosition
    if (hour12 || type === 'meridiem') {
      maxPosition = -(data.length - 1) * 50
    } else {
      maxPosition = -data.length * 50
    }

    let rounderPosition = Math.round((position + offset * 5) / 50) * 50
    let finalPosition = Math.max(maxPosition, Math.min(0, rounderPosition))

    dragging = false
    position = finalPosition

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchmove', onMouseMove)
    window.removeEventListener('touchend', onMouseUp)

    setPosition()
    onTimeChange(type, -finalPosition / 50)
  }

  function clickEvent(tag) {
    if (tag === 1) {
      position = position - 50
      setPosition()
    }

    if (tag === 2) {
      position = position + 50
      setPosition()
    }

    onTimeChange(type, -position / 50)
  }
</script>

<style>
  .touch-time-wrapper {
    position: relative;
    height: 50px;
    margin: 0 10px;
    border-top: 1px solid var(--svtt-bar-color, grey);
    border-bottom: 1px solid var(--svtt-bar-color, grey);
    border-radius: 0;
  }
  .touch-time-container {
    margin: 0;
    padding: 0;
  }

  .touch-time-wrapper:before,
  .touch-time-wrapper:after {
    content: '';
    position: absolute;
    left: 0;
    width: 40px;
    height: 50px;
    background-color: #fff;
    opacity: 0.8;
    pointer-events: none;
    z-index: 1;
  }

  .touch-time-wrapper:before {
    top: -51px;
  }

  .touch-time-wrapper:after {
    bottom: -51px;
  }

  .touch-time-container li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 50px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .touch-add {
    width: 90%;
    /* margin: 0 10px; */
    text-align: center;
    display: inline-block;
    top: -50px;
    position: relative;
    background: #fff;
    z-index: 2;
    cursor: pointer;
  }
  .touch-minus {
    width: 90%;
    /* margin: 0 10px; */
    text-align: center;
    display: inline-block;
    bottom: -50px;
    position: relative;
    background: #fff;
    z-index: 2;
    cursor: pointer;
  }
</style>

<div style="text-align: center;">
  <span class="touch-add" on:click={() => clickEvent(1)} id="{addId}">+</span>
  <div class="touch-time-wrapper" on:mousedown={onMouseDown} on:touchstart={onMouseDown}>
    <ul bind:this={itemWrapper} class="touch-time-container">
      {#each data as item}
        <li>{item}</li>
      {/each}
    </ul>
  </div>
  <span class="touch-minus" on:click={() => clickEvent(2)}>-</span>
</div>
