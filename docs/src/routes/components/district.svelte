<script>
  import { District } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'

  let province_name = "北京市";
  let city_name = "市辖区";
  let county_name = "昌平区";

  function checkEvent(e){
    console.log(e)
  }
</script>

<DocHeader title="District" subtitle="省市区级联" />

<Example code={`<script>
  import { District } from 'svelma-pro'
</script>

<District />
`}>
  <div slot="preview">
    <District />
  </div>
</Example>

<hr class="is-medium">

<p class="title is-4">绑定</p>

<Example code={`<script>
  import { District } from 'svelma-pro'


  let province_name = "北京市";
  let city_name = "市辖区";
  let county_name = "昌平区";

  function checkEvent(e){
    console.log(e)
  }
</script>

<District />
`}>
  <div slot="preview">
    <District province_name={province_name} city_name={city_name} county_name={county_name} on:checked={checkEvent}/>
  </div>
</Example>