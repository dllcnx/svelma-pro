<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/select.json`)
    const jsdoc = await res.json()

    return { jsdoc }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { Table, Icon, Datepicker, Select } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'

    export let jsdoc

 
    onMount(() => {

    })
    let value = '';

    const params = [
        {"label": "点", "value": "point"},
        {"label": "圆", "value": "ellipse"},
        {"label": "图片", "value": "billboard"},
        {"label": "文字", "value": "label"}
    ]

    function select(e) {
        console.log(e.detail)
    }
</script>

<style>

</style>
<DocHeader title="Select" subtitle="下拉选择框" />

<!-- <button class="button is-primary"  on:click="{() => add()}">添加</button> -->

<p class="title is-4">基础用法</p>
<Example
  code={`<script>
    import { Select } from 'svelma-pro'
    let value = '';
    const params = [
        {"label": "点", "value": "point"},
        {"label": "圆", "value": "ellipse"},
        {"label": "图片", "value": "billboard"},
        {"label": "文字", "value": "label"}
    ]

    function select(e) {
        console.log(e.detail)
    }
</script>
<Select
    MulChoice={false}
    ArrayList={params}
    Noenable={false}
    Modify={'width:100%'}
    bind:Choose={value}
    on:changSelect={select} >
</Select>
`}>
 <div slot="preview">
    <Select
        MulChoice={false}
        ArrayList={params}
        Noenable={false}
        Modify={'width:100%'}
        bind:Choose={value}
        on:changSelect={select} />
 </div>
</Example>
<hr class="is-medium" />


<p class="title is-4">多选</p>
<Example
  code={`<script>
    import { Select } from 'svelma-pro'
    let value = '';
    const params = [
        {"label": "点", "value": "point"},
        {"label": "圆", "value": "ellipse"},
        {"label": "图片", "value": "billboard"},
        {"label": "文字", "value": "label"}
    ]

    function select(e) {
        console.log(e.detail)
    }
</script>
<Select
    MulChoice={true}
    ArrayList={params}
    Noenable={false}
    Modify={'width:100%'}
    bind:Choose={value}
    on:changSelect={select} >
</Select>
`}>
 <div slot="preview">
    <Select
        MulChoice={true}
        ArrayList={params}
        Noenable={false}
        Modify={'width:100%'}
        bind:Choose={value}
        on:changSelect={select} />
 </div>
</Example>
<hr class="is-medium" />

<JSDoc {jsdoc} showEvent="true"/>
