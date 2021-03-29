<script context="module">
  export async function preload() {
    const res = await this.fetch(`components/colorPicker.json`);
    const jsdoc = await res.json();

    return { jsdoc };
  }
</script>
<script>
    import {
        ColorPicker
    } from 'svelma-pro'
    import DocHeader from '../../components/DocHeader.svelte'
    import Example from '../../components/Example.svelte'
    import JSDoc from '../../components/JSDoc.svelte'

    export let jsdoc
    let color = "rgba(70,197,85,1)";

    function change(e) {
        console.log(e.detail)
    }
</script>

<DocHeader title="ColorPicker" subtitle="拾色器" />

<Example code={`<script>
    import { ColorPicker } from 'svelma-pro'
    let color = "rgba(70,197,85,1)";


    function change(e){
    console.log(e.detail)
    }
    </script>

    <ColorPicker {color} on:change={change} switchs={false}/>
    `}>
    <div slot="preview">
        <ColorPicker {color} on:change={change} switchs={false} />
    </div>
</Example>

<hr class="is-medium" />

<p class="title is-4">面板模式</p>

<Example code={`<script>
  import { ColorPicker } from 'svelma-pro'
   let color = "rgba(70,197,85,1)";
</script>

<ColorPicker {color} on:change={change}  mode="2"/>
`}>
  <div slot="preview">
    <ColorPicker {color} mode="2"/>
  </div>
</Example>

<JSDoc {jsdoc} showEvent="true"></JSDoc>