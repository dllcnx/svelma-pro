<script>
  import { onMount, setContext, onDestroy, createEventDispatcher } from 'svelte'

  import { writable } from 'svelte/store'

  const dispatch = createEventDispatcher()

  export let accordion = false

  export let activeNames = [];
  $:{
    if(typeof activeNames === 'string'){
      activeNames = [activeNames];
    }
  }

  const store = writable('none')

  const config = {
    activeNames,
    store,
  }
  setContext('config', config)

  const unsubscribe = store.subscribe(value => {
    if (value.activeNames || value == [] || value == 'none') return
    handleItemClick(value)
  })

  function setActiveNames(name) {
    const names = [].concat(name)
    let value = accordion ? names[0] : names
    activeNames = names
    store.update(value => {
      return { activeNames }
    })
    value = value ? value : []
    dispatch('change', value)
  }

  function handleItemClick(name) {
    if (accordion) {
      const data = (activeNames[0] || activeNames[0] === 0) && activeNames[0] === name ? '' : name
      setActiveNames(data)
    } else {
      let names = activeNames.slice(0)
      let index = names.indexOf(name)

      if (index > -1) {
        if (typeof names === 'string') {
          names = ''
        } else {
          names.splice(index, 1)
        }
      } else {
        if (typeof names === 'string') {
          names = ''
        } else {
          names.push(name)
        }
      }
      setActiveNames(names)
    }
  }

  onDestroy(() => {
    unsubscribe()
  })
</script>

<style lang="scss">
  // .smx-collapse {
  //   border-top: 1px solid #ebeef5;
  //   border-bottom: 1px solid #ebeef5;
  // }
</style>

<div class="smx-collapse">
  <slot />
</div>
