<script>
  import * as transitions from 'svelte/transition'
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  /** Whether the Collapse is acitve or not
   * @svelte-prop {boolean} acitve=true
   * */
  export let acitve = false

  export let title = '未定义标题'
  export let closeArrow = true

  export let name = getSort()

  let activeNames = ''

  let config = getContext('config')

  activeNames = config.activeNames

  config.store.subscribe(value => {
    if (value == [] || value == 'none') return
    // if (value.activeNames) {
    //   activeNames = value.activeNames;
    // }
    value.activeNames ? (activeNames = value.activeNames) : null
  })

  $: acitve = activeNames.indexOf(name) > -1

  /** Animation to use when acitveing/closing
   * @svelte-prop {String} animation=slide
   * @values Any animation that ships with Svelte
   * */
  export let animation = 'slide'

  let _animation = transitions[animation]
  $: _animation = typeof animation === 'function' ? animation : transitions[animation]

  function toggle() {
    acitve = !acitve
    config.store.update(value => {
      return name
    })

    // value = value ? value : []
    // dispatch('change', value)
  }

  function getSort() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    array.sort(function() {
      return 0.5 - Math.random()
    })
    return array.join('')
  }
</script>

<style lang="scss">
  .collapse-trigger-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #303133;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    font-weight: 500;
    outline: none;
    padding: 0 16px;
    background-color: rgba(234, 234, 238, 0.5);
    border-bottom: 1.5px solid #fff;
    transition: border-bottom-color 0.3s;
  }
  .collapse-content {
    will-change: height;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
  }
  .collapse-icon-arrow {
    transition: transform 0.3s;
  }
  .is-active {
    transform: rotate(90deg);
  }
</style>

<div class="collapse">
  <div class="collapse-trigger" name={name} on:click={() => toggle()}>
    <div class="collapse-trigger-header">
      <slot name="title">{title}</slot>
      {#if closeArrow}
        <i class="collapse-icon-arrow fa fa-chevron-right" class:is-active={acitve} />
      {/if}
    </div>
  </div>
  {#if acitve}
    <div class="collapse-content" transition:_animation>
      <slot />
    </div>
  {/if}
</div>
