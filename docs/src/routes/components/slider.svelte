<script context="module">
	export async function preload() {
		const res = await this.fetch(`components/slider.json`);
    const jsdoc = await res.json();

		return { jsdoc };
	}
</script>
<script>
  import { Slider } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'

    export let jsdoc
   let value = [0, 1];
   let range2 = [10, 110];
</script>


<DocHeader title="Slider" subtitle="滑动条" />

<Example code={`<script>
  import { Slider } from 'svelma-pro'
  let value = [0, 1];
</script>
{value[0]}
<Slider bind:value min="0" max="1" step="0.01"/>
`}>
  <div slot="preview">
    {value[0]}
    <Slider bind:value min="0" max="1" step="0.01"/>
  </div>
</Example>

<hr class="is-medium" />

<p class="title is-4">范围选择</p>

<Example code={`<script>
import { Slider } from 'svelma-pro'

 let range2 = [10, 110];
</script>

 {value[0]}-{value[1]}
 <Slider max="200" step="10" bind:value={range2} range order tip="true"/>
`}>
  <div slot="preview">
  {range2[0]}-{range2[1]}
   <Slider max="200" step="10" bind:value={range2} range order tip="true"/>
  </div>
</Example>

<JSDoc {jsdoc} showEvent="true"></JSDoc>