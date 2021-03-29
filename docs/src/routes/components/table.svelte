<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/table.json`)
    const jsdoc = await res.json()

    return { jsdoc }
  }
</script>

<script>
  import { onMount } from 'svelte'
  import { Table, Icon, Datepicker } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc

  let counter = 0
  let users = []
  async function update() {
    users = (await (await fetch('https://randomuser.me/api/?results=10')).json()).results
  }
  onMount(() => {
    update()
  })
  let thead = ['ID', '名称', '日期', '负责人', '描述'];
  let tbody = [
    {id: 1, name: 'Sm@rtMapX', date: '2017/10/01 - 2019/11/30', admin: '王勤', desc: '敏捷GIS开发平台'},
    {id: 2, name: 'Sm@rtEarthX', date: '2020/03/19 - 2020/10/15', admin: '宋伟', desc: '三维地图'},
    {id: 3, name: 'Sm@rtNaviX', date: '2019/07/15 - 2020/01/15', admin: '宋伟', desc: '区域导航'},
  ];

  let thead5 = ['address', 'wkb_geometry', 'ogc_fid', 'name'];
  let thead1 = ['address', 'wkb_geometry', 'ogc_fid', 'name', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone'];

  let tbody6 = [
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行"},
    {"address":"上海市浦东新区杨思路2号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.485048227148,31.1566628156962]}","ogc_fid":2,"name":"杨思中石油"},
    {"address":"上海市浦东新区张扬路648号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.520938183314,31.2283605523532]}","ogc_fid":3,"name":"浙商银行"},
    {"address":"上海市浦东新区浦东大道637号（近东方路）","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.522826426731,31.2408016168448]}","ogc_fid":4,"name":"大道支行"},
    {"address":"上海市浦东新区浦东大道968号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.534173711507,31.2420590355424]}","ogc_fid":5,"name":"大道二支行"},
    {"address":"上海市浦东新区张扬路1593号（近桃林路）","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.538959941046,31.2349002816665]}","ogc_fid":6,"name":"桃林支行"},
    {"address":"上海市浦东新区龚路公路1401号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.71956776239,31.2741792468696]}","ogc_fid":7,"name":"浦东殡仪馆"},
    {"address":"上海市浦东新区民春路32号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.656079901542,31.2719406353719]}","ogc_fid":8,"name":"曹路支行"},
    {"address":"上海市龙东大道5385号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.68271016779,31.2341896769549]}","ogc_fid":9,"name":"龙东大道支行"},
    {"address":"上海市浦东新区唐安路810-826号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.653015908286,31.2078347418325]}","ogc_fid":10,"name":"唐镇支行"},
    {"address":"上海市浦东新区高木桥路275号-279号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.630379093694,31.1834015245085]}","ogc_fid":11,"name":"孙桥支行"},
    {"address":"上海市张江路639号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.615940251585,31.2048503375227]}","ogc_fid":12,"name":"张江支行"},
    {"address":"上海市张江路605号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.615703625075,31.2053547740292]}","ogc_fid":13,"name":"南京张江"},
    {"address":"上海市浦东新区张江蔡伦路1200号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.596673922555,31.19402692412]}","ogc_fid":14,"name":"中医大"}
  ];
  let tbody1 = [
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
   {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"}
  ];

  function getChecked(res) {
    console.log(res.detail)
  }
  function add() {
    tbody.push({id: 4, name: 'Sm@334rtNaviX', date: '201r349/07/15 - 2020/01/15', admin: '宋434伟', desc: '区域434导航'})
    // tbody = tbody;
    // console.log(tbody)
  }
</script>

<style>

</style>
<DocHeader title="table" subtitle="表格" />

<!-- <button class="button is-primary"  on:click="{() => add()}">添加</button> -->

<p class="title is-4">基础表格</p>
<Example
  horizontal={true}
  code={`<script>
  import { Table } from 'svelma-pro'
  let thead = ['ID', '名称', '日期', '负责人', '描述']
  let tbody = [
    {id: 1, name: 'Sm@rtMapX', date: '2017/10/01 - 2019/11/30', admin: '王勤', desc: '敏捷GIS开发平台'},
    {id: 2, name: 'Sm@rtEarthX', date: '2020/03/19 - 2020/10/15', admin: '宋伟', desc: '三维地图'},
    {id: 3, name: 'Sm@rtNaviX', date: '2019/07/15 - 2020/01/15', admin: '宋伟', desc: '区域导航'},
  ]
</script>
<Table 
  types="is-bordered is-striped is-hoverable is-fullwidth"
  thead={thead}
  tbody={tbody}>
</Table>
`}>
 <div slot="preview">
  <Table 
    types="is-bordered is-striped is-hoverable is-fullwidth"
    thead={thead}
    bind:tbody={tbody}>
  </Table>
 </div>
</Example>
<hr class="is-medium" />



<p class="title is-4">自定义表格</p>
  <!-- <Table custom={false} checkbox {thead} {tbody} bodyHeight="400px" on:checked="{(res) => getChecked(res)}" types="is-bordered is-striped is-hoverable is-fullwidth"> -->
<Example
  horizontal={true}
  code={`<script>
  import { Table, Datepicker } from 'svelma-pro'
  let thead = ['ID', '名称', '日期', '负责人', '描述']
  let tbody = [
    {id: 1, name: 'Sm@rtMapX', date: '2017/10/01 - 2019/11/30', admin: '王勤', desc: '敏捷GIS开发平台'},
    {id: 2, name: 'Sm@rtEarthX', date: '2020/03/19 - 2020/10/15', admin: '宋伟', desc: '三维地图'},
    {id: 3, name: 'Sm@rtNaviX', date: '2019/07/15 - 2020/01/15', admin: '宋伟', desc: '区域导航'},
  ]
</script>
<!-- 自定义表格的表格基础样式都属于自定义范畴 -->
<Table 
  types="is-bordered is-striped is-hoverable is-fullwidth" 
  custom thead={thead} tbody={tbody}>
  <!-- head插槽会返回相应渲染值：head -->
  <th slot="head" let:head>
    {#if head == '负责人'}
      <span style="color: red">{head}</span>
    {:else}
      <span>{head}</span>
    {/if}
  </th>
  <!-- body插槽会返回相应行的对象和索引:row、index, 以及每列对应的key -->
  <td slot="body" let:row let:key let:index>
    {#if key == 'admin'}
      <span style="color: red">{row[key]}</span>
    {:else if key == 'date'}
      <Datepicker/>
    {:else}
      <span>{row[key]}</span>
    {/if}
  </td>
</Table>
`}>
 <div slot="preview">
  <Table 
    types="is-bordered is-striped is-hoverable is-fullwidth"
    custom thead={thead} tbody={tbody}>
    <!-- head插槽会返回相应渲染值：head -->
    <th slot="head" let:head>
      {#if head == '负责人'}
        <span style="color: red">{head}</span>
      {:else}
        <span>{head}</span>
      {/if}
    </th>
    <!-- body插槽会返回相应行的对象和索引:row、index, 以及每列对应的key -->
    <td slot="body" let:row let:key let:index>
      {#if key == 'admin'}
        <span style="color: red">{row[key]}</span>
      {:else if key == 'date'}
        <Datepicker/>
      {:else}
        <span>{row[key]}</span>
      {/if}
    </td>
  </Table>
 </div>
</Example>  
<hr class="is-medium" />


<p class="title is-4">添加选择框</p>
<Example
  horizontal={true}
  code={`<script>
  import { Table } from 'svelma-pro'
  let thead = ['ID', '名称', '日期', '负责人', '描述']
  let tbody = [
    {id: 1, name: 'Sm@rtMapX', date: '2017/10/01 - 2019/11/30', admin: '王勤', desc: '敏捷GIS开发平台'},
    {id: 2, name: 'Sm@rtEarthX', date: '2020/03/19 - 2020/10/15', admin: '宋伟', desc: '三维地图'},
    {id: 3, name: 'Sm@rtNaviX', date: '2019/07/15 - 2020/01/15', admin: '宋伟', desc: '区域导航'},
  ]
  function getChecked(res) {
    console.log(res.detail)
  }
</script>
<Table 
  types="is-bordered is-striped is-hoverable is-fullwidth"
  thead={thead}
  tbody={tbody}
  checkbox
  on:checked={(res) => getChecked(res)}>
</Table>
`}>
 <div slot="preview">
  <Table 
    types="is-bordered is-striped is-hoverable is-fullwidth"
    thead={thead}
    tbody={tbody}
    checkbox 
    on:checked={(res) => getChecked(res)}>
  </Table>
 </div>
</Example>
<hr class="is-medium" />


<p class="title is-4">固定表头</p>
<Example
  horizontal={true}
  code={`<script>
  import { Table } from 'svelma-pro'

  let thead = ['address', 'wkb_geometry', 'ogc_fid', 'name', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone', 'phone'];
  let tbody = [
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"},
    {"address":"云桥路875号","wkb_geometry":"{\"type\":\"Point\",\"coordinates\":[121.61760661737,31.2496435849155]}","ogc_fid":1,"name":"东区支行", "phone": "13627220747", "phone1": "13627220747", "phone2": "13627220747", "phone3": "13627220747", "phone4": "13627220747", "phone5": "13627220747", "phone6": "13627220747", "phone7": "13627220747", "phone8": "13627220747", "phone9": "13627220747", "phone10": "13627220747", "phone11": "13627220747", "phone12": "13627220747"}
  ];
  function getChecked(res) {
    console.log(res.detail)
  }
</script>
<!-- 自定义表格固定表头在下拉时不起作用 -->
<Table 
  types="is-bordered is-striped is-hoverable is-fullwidth"
  thead={thead}
  tbody={tbody}
  checkbox
  bodyHeight="400px"
  on:checked={(res) => getChecked(res)}>
</Table>
`}>
 <div slot="preview">
  <!-- 自定义表格固定表头在下拉时不起作用 -->
  <Table 
    types="is-bordered is-striped is-hoverable is-fullwidth"
    thead={thead1}
    tbody={tbody1}
    checkbox 
    bodyHeight="400px"
    on:checked={(res) => getChecked(res)}>
  </Table>
 </div>
</Example>

<JSDoc {jsdoc} showEvent="true"/>
