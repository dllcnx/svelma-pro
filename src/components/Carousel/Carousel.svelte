<script>
  import { onMount } from 'svelte'
  import Swiper from './swiper'

  export let id = '';
  export let options = []
  export let pagination = true
  export let navigation = true
  export let autoplay = false
  export let delay = 3000
  export let direction = 'horizontal' // horizontal vertical
  export let loop = true
  export let disableOnInteraction = true
  export let effect = 'slide' //默认为"slide"（位移切换），可设置为'slide'（普通切换、默认）,"fade"（淡入）"cube"（方块）"coverflow"（3d流）"flip"（3d翻转）。

  onMount(() => {
    const autoOps = autoplay
      ? {
          delay: delay,
          stopOnLastSlide: false,
          disableOnInteraction: disableOnInteraction,
        }
      : autoplay

    var mySwiper = new Swiper(`.swiper-container`, {
      autoplay: autoOps, //可选选项，自动滑动
      direction: direction, // 垂直切换选项
      loop: loop, // 循环模式选/**/项
      effect: effect,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  })
</script>

<style>
  .carousel-container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>

<div class="swiper-container carousel-container">
  <div class="swiper-wrapper">
    {#each options as item}
      <div class="swiper-slide">
        <img src={item} alt="" style="width: 100%;height: 100%;"/>
        <!-- {item} -->
      </div>
    {/each}
  </div>

  <!-- 如果需要分页器 -->
  {#if pagination}
    <div class="swiper-pagination" />
  {/if}

  <!-- 如果需要导航按钮 -->
  {#if navigation}
    <div class="swiper-button-prev" />
    <div class="swiper-button-next" />
  {/if}
</div>
