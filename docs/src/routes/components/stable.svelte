<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/stable.json`)
    const jsdoc = await res.json()

    return {
      jsdoc
    }
  }
</script>

<script>
  import {
    onMount
  } from 'svelte'
  import {
    Stable,
    Icon,
    Datepicker,
    Button
  } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'
  import MDDoc from '../../components/MDDoc.svelte';
  import md from '../../mddocs/stable.md';

  export let jsdoc

  let colums = [{
    key: "id",
    title: "ID"
  }, 
  {
    key: "name",
    title: "名称"
  }, 
  {
    key: "date",
    title: "时间"
  }, 
  {
    key: "admin",
    title: "权限"
  },
   {
    key: "desc",
    title: "描述"
  }];
  let data = [{
      id: 1,
      name: 'A',
      date: '2017/10/01',
      admin: '01',
      desc: '我是01'
    },
    {
      id: 2,
      name: 'B',
      date: '2020/03/19',
      admin: '02',
      desc: '我是02'
    },
    {
      id: 3,
      name: 'C',
      date: '2019/07/15',
      admin: '03',
      desc: '我是03'
    },
  ];


  let sortBy = "first_name";
  let sortOrder = 1;

  const colums2 = [{
      key: "id",
      title: "ID",
      sortable: true,
    },
    {
      key: "first_name",
      title: "FIRST NAME",
      sortable: true,
    },
    {
      key: "last_name",
      title: "LAST NAME",
      sortable: true,
      component: true
    },
    {
      key: "email",
      title: "EMAIL",
      sortable: true
    },
    {
      key: "gender",
      title: "GENDER",
      sortable: true,
    },
    {
      key: "ip_address",
      title: "IP ADDRESS",
      sortable: true,
    },
  ];

  let data2 = [{
      id: 1,
      first_name: "1",
      last_name: "234",
      gender: "Mal1e",
      ip_address: "192.168.",
      email: "234",
    },
    {
      id: 2,
      first_name: "2",
      last_name: "234",
      gender: "Male",
      ip_address: "192.168.",
      email: "234",
    },
  ];


    function submit(v){
    alert('当前行为'+v.id);
  }
</script>

<style>
:global(.button){
  margin: 3px;
}
</style>
<DocHeader title="stable" subtitle="表格" />

<!-- <button class="button is-primary"  on:click="{() => add()}">添加</button> -->

<p class="title is-4">基础表格</p>
<Example horizontal={true} code={`<script>
  import { Stable } from 'svelma-pro'
  let colums = [
  {key: "id",title: "ID"},
  {key: "name",title: "名称"},
  {key: "date",title: "时间"},
  {key: "admin",title: "权限"},
  {key: "desc",title: "描述"}];
  let data = [
  {id: 1,name: 'A',date: '2017/10/01',admin: '01',desc: '我是01'},
  {id: 2,name: 'B',date: '2020/03/19',admin: '02',desc: '我是02'},
  {id: 3,name: 'C',date: '2019/07/15',admin: '03',desc: '我是03'},
  ];
  </script>
  <Stable columns={colums} rows={data}></Stable>
  `}>
  <div slot="preview" style="height: 200px">
    <Stable columns={colums} rows={data}></Stable>
  </div>
</Example>
<hr class="is-medium" />


<p class="title is-4">表格设置</p>
更多设置参数见文档。
<Example horizontal={true} code={`<script>
  import { Stable } from 'svelma-pro'
  let colums = [
  {key: "id",title: "ID"},
  {key: "name",title: "名称"},
  {key: "date",title: "时间"},
  {key: "admin",title: "权限"},
  {key: "desc",title: "描述"}];
  let data = [
  {id: 1,name: 'A',date: '2017/10/01',admin: '01',desc: '我是01'},
  {id: 2,name: 'B',date: '2020/03/19',admin: '02',desc: '我是02'},
  {id: 3,name: 'C',date: '2019/07/15',admin: '03',desc: '我是03'},
  ];
  </script>
  <Stable columns={colums} rows={data} checkbox={true} bordered={true} narrow={true}></Stable>
  `}>
  <div slot="preview" style="height:200px">
    <Stable columns={colums} rows={data} checkbox={true} bordered={true} narrow={true}></Stable>
  </div>
</Example>
<hr class="is-medium" />


<p class="title is-4">高级表格配置</p>
更多高级配置项详见文档。
<Example horizontal={true} code={`<script>
  import { Stable } from 'svelma-pro'
  import {Button} from "svelma-pro";

  let sortBy = "first_name";
  let sortOrder = 1;

  const colums2 = [{
      key: "id",
      title: "ID",
      sortable: true,
    },
    {
      key: "first_name",
      title: "FIRST NAME",
      sortable: true,
    },
    {
      key: "last_name",
      title: "LAST NAME",
      sortable: true,
      component: true
    },
    {
      key: "email",
      title: "EMAIL",
      sortable: true
    },
    {
      key: "gender",
      title: "GENDER",
      sortable: true,
    },
    {
      key: "ip_address",
      title: "IP ADDRESS",
      sortable: true,
    },
  ];

  const data2 = [{
      id: 234,
      first_name: "1",
      last_name: "234",
      gender: "Mal1e",
      ip_address: "192.168.",
      email: "234",
    },
    {
      id: 234,
      first_name: "2",
      last_name: "234",
      gender: "Male",
      ip_address: "192.168.",
      email: "234",
    },
  ];

  function submit(v){
    alert('当前行为'+v.id);
  }

     <Stable columns={colums2} rows={data2} bind:sortBy bind:sortOrder>
      <div class="buttons" slot="component" let:row>
        <Button type="is-primary" size="is-small" on:click={(e)=>submit(row)}>Submit</Button>
        <Button type="is-primary" size="is-small" >Reset</Button>
      </div>
    </Stable>
  `}>
  <div slot="preview" style="height:200px">
    <Stable columns={colums2} rows={data2} bind:sortBy bind:sortOrder key={'id'} activedRowKey={[2]}>
      <div class="buttons" slot="component" let:row>
        <Button type="is-primary" size="is-small"  on:click={(e)=>submit(row)}>Submit</Button>
        <Button type="is-primary" size="is-small" >Reset</Button>
      </div>
    </Stable>
  </div>
</Example>

<MDDoc html={md.html}></MDDoc>
<!-- <img src="./stable.png" alt=""> -->