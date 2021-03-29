<script>
  import { onDestroy, onMount } from 'svelte'
  import { chooseAnimation, isEscKey } from '../../utils'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let active = true // 是否激活
  export let title = 'Modal title' //标题
  export let animation = 'scale'
  export let animProps = { start: 1.2 }
  export let size = ''
  export let showClose = true //显示左上角关闭按钮
  export let showHeader = true //是否显示头
  export let backdrop = true // 遮罩
  export let backdropClose = true // 点击遮罩是否关闭
  export const subComponent = null
  export let onBody = true

  // 宽高
  export let width = ''
  export let height = ''

  let modal

  let pointEvent = backdrop ? 'unset' : 'none'

  $: _animation = chooseAnimation(animation)
  $: {
    if (modal && active && onBody) {
      modal.parentNode.removeChild(modal)
      document.body.appendChild(modal)
    } else {
      modal = null
    }
  }
  onMount(() => {})

  function close() {
    modal = null
    active = false
    dispatch('closeEvent', '')
  }

  function keydown(e) {
    if (active && isEscKey(e)) {
      close()
    }
  }
</script>

<svelte:window on:keydown={keydown} />

{#if active}
  <div class="modal {size} is-active" bind:this={modal} style="pointer-events: {pointEvent}">
    {#if backdrop}
      <div
        class="modal-background"
        on:click={e => {
          if (backdropClose) close()
        }} />
    {/if}
    <div class="modal-card" transition:_animation|local={animProps} style="width: {width};height: {height}">
      {#if showHeader}
        <header class="modal-card-head">
          <div class="modal-card-border">
            <p class="modal-card-title">{title}</p>
          </div>
        </header>
      {/if}
      {#if showClose}
        {#if showHeader}
          <button class="delete" aria-label="close" on:click={close} />
        {:else}
          <button class="delete" aria-label="close" on:click={close} style="top: 2px;right: 2px;"/>
        {/if}
      {/if}
      <section class="modal-card-body">
        <slot />
      </section>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
{/if}

<style>
  .modal-footer {
    background-color: rgb(255, 255, 255);
    /* padding: 10px 20px; */
    text-align: center;
  }
  .delete {
    position: absolute;
    top: 10px;
    right: 20px;
    background-color: white;
  }
  .delete::before {
    height: 2px;
    width: 75%;
    background-color: #666;
  }
 .delete::after {
    height: 75%;
    width: 2px;
    background-color: #666;
  }
  .modal-card-head {
    height: 38px;
    padding: 0 20px;
    background-color: white;
    border: none;
  }

  .modal-card-title {
    font-size: 1.2rem;
  }
  .modal-card-border {
    width: 100%;
    height: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
</style>
