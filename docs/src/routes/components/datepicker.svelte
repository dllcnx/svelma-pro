<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/datepicker.json`)
    const jsdoc = await res.json()

    return { jsdoc }
  }
</script>
<script>
  import { Datepicker }  from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
    import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc

let result = 1584517629215;

function click(e){
  alert(e.detail.time)
}
</script>

<DocHeader title="Datepicker" subtitle="日期选择器" />

<p class="title is-4">默认与暗黑主题</p>

<Example code={`<script>
  import {Datepicker} from 'svelma-pro'
</script>

<Datepicker/>
<Datepicker theme="dark"/>
`}>
<div slot="preview">
    <Datepicker/>
    <Datepicker theme="dark"/>
</div>
</Example>

<hr class="is-medium" />

<p class="title is-4">范围选择与自由选择</p>

<Example code={`<script>
  import {Datepicker} from 'svelma-pro'
</script>

<Datepicker pickerRule="freeChoice"/>
<Datepicker pickerRule="rangeChoice"/>
`}>
<div slot="preview">
    <Datepicker pickerRule="freeChoice"/>
    <Datepicker pickerRule="rangeChoice"/>
</div>
</Example>

<hr class="is-medium" />

<p class="title is-4">获取结果</p>

<Example code={`<script>
  import Datepicker from 'svelma-pro'

  function click(e){
    alert(e.detail.timeStamp)
  }
</script>

<Datepicker on:dateChecked={click}/>
`}>
<div slot="preview">
    <Datepicker on:dateChecked={click}/>
</div>
</Example>

<JSDoc {jsdoc} showEvent="true"/>