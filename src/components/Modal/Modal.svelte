<script>
  import { onDestroy, onMount } from 'svelte'
  import { chooseAnimation, isEscKey } from '../../utils'

  export let active = true // 是否激活
  export let title = 'Modal title' //标题
  export let animation = 'scale'
  export let animProps = { start: 1.2 }
  export let size = ''
  export let showClose = true //显示左上角关闭按钮
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
  }

  function keydown(e) {
    if (active && isEscKey(e)) {
      close()
    }
  }
</script>

<style>
  .modal-footer {
    background-color: rgb(255, 255, 255);
    padding: 10px 20px;
    text-align: center;
  }
</style>

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
      <header class="modal-card-head">
        <p class="modal-card-title">{title}</p>
        {#if showClose}
          <button class="delete" aria-label="close" on:click={close} />
        {/if}
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
{/if}
