<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/timepicker.json`)
    const jsdoc = await res.json()

    return { jsdoc }
  }
</script>
<script>
  import {Timepicker} from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc

   let time = new Date();

   function test(e){
    //  debugger;
     console.log(e)
   }
</script>

<DocHeader title="Timepicker" subtitle="时间选择器" />

<Example
  code={`<script>
import {Timepicker} from 'svelma-pro'
</script>

<Timepicker bind:time />
`}>
 <div slot="preview">
    <Timepicker bind:time  on:change={test}/>
 </div>
</Example>

<JSDoc {jsdoc} showEvent="true"/>