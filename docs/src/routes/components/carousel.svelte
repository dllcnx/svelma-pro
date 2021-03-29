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
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e'
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
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e',
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1-q.mafengwo.net%2Fs7%2FM00%2F25%2FE2%2FwKgB6lPh4UeARKPpAABh4pruLDc72.jpeg%3FimageMogr2%252Fthumbnail%252F%21310x207r%252Fgravity%252FCenter%252Fcrop%252F%21310x207%252Fquality%252F90&refer=http%3A%2F%2Fp1-q.mafengwo.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619590857&t=b671b501bd1087f3b91aa7d548f6ea0e'
  ];
  </script>

  <Carousel options={options} />
  `}>
  <div slot="preview" class="preview">
    <Carousel options={options} />
  </div>
</Example>

<JSDoc {jsdoc}></JSDoc>