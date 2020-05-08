<script context="module">
  export async function preload() {
    const res = await this.fetch(`components/carousel.json`);
    const jsdoc = await res.json();

    return {
      jsdoc
    };
  }
</script>
<script>
    import {
        Carousel
    } from 'svelma-pro'
    import DocHeader from '../../components/DocHeader.svelte'
    import Example from '../../components/Example.svelte'
    import JSDoc from '../../components/JSDoc.svelte'

    export let jsdoc

    let options = [
        'http://dev.smartmapx.com/assets/source-img/banner/banner.jpg',
        'http://dev.smartmapx.com/assets/source-img/banner/banner2.jpg',
        'http://dev.smartmapx.com/assets/source-img/banner/banner3.jpg',
        'http://dev.smartmapx.com/assets/source-img/banner/banner4.jpg'
    ];
</script>
<style>
  .preview {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<DocHeader title="Carousel" subtitle="跑马灯" />

<Example code={`<script>
    import { Carousel } from 'svelma-pro'

      let options = [
        'http://dev.smartmapx.com/assets/source-img/banner/banner.jpg',
        'http://dev.smartmapx.com/assets/source-img/banner/banner2.jpg',
        'http://dev.smartmapx.com/assets/source-img/banner/banner3.jpg',
        'http://dev.smartmapx.com/assets/source-img/banner/banner4.jpg'
    ];
    </script>

    <Carousel options={options} />
    `}>
    <div slot="preview" class="preview">
        <Carousel options={options} />
    </div>
</Example>

<JSDoc {jsdoc}></JSDoc>