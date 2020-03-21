<script>
  export let type = ''
  export let pack = 'fa' // 包装
  export let icon // 图标
  export let size = '' // 大小
  export let customClass = ''
  export let customSize = ''
  export let isClickable = false
  export let isLeft = false
  export let isRight = false
  export let num = '' // 数量

  let newCustomSize = ''
  let newType = ''

  $: numClass = !num || num === '' ? 'icon' : 'icon_num'
  $: newPack = pack || 'fa'

  $: {
    if (customSize) newCustomSize = customSize
    else {
      switch (size) {
        case 'is-small':
          break
        case 'is-medium':
          newCustomSize = 'fa-lg'
          break
        case 'is-large':
          newCustomSize = 'fa-2x'
          break
        default:
          newCustomSize = ''
      }
    }
  }

  $: {
    if (!type) newType = ''
    let splitType = []
    if (typeof type === 'string') {
      splitType = type.split('-')
    } else {
      for (let key in type) {
        if (type[key]) {
          splitType = key.split('-')
          break
        }
      }
    }
    if (splitType.length <= 1) newType = ''
    else newType = `has-text-${splitType[1]}`
  }
</script>

<style>
  .icon_num {
    position: relative;
  }
  .num {
    position: absolute;
    top: 0;
    left: 50%;
    height: 15px;
    /* z-index: 999; */
    text-align: center;
    line-height: 15px;
    color: #000;
    padding: 0 5px;
    background: #23d160;
    border-radius: 5px;
  }

  .is-clickable {
    cursor: pointer;
  }
</style>

<span
  class="icon {numClass} {size}
  {newType}
  {(isLeft && 'is-left') || ''}
  {(isRight && 'is-right') || ''}"
  class:is-clickable={isClickable}
  on:click>
  {#if num}
    <div class="num">{num}</div>
  {/if}
  <i class="{newPack} fa-{icon} {customClass} {newCustomSize}" />
</span>
