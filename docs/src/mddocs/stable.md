

## 参数

| Option            | Type         | Description                                    |
| ----------------- | ------------ | ---------------------------------------------- |
| `columns`         | Object[]     | 列配置                |
| `rows`            | Object[]     | 行数据                              |
| `sortBy`          | String       | 需要排序列key                                 |
| `sortOrder`       | Number       | 排序 `1` = 升序, `-1` 降序             |
| `clickCol`        | function     | event listener/callback                        |
| `clickRow`        | function     | event listener/callback                        |
| `clickCell`       | function     | event listener/callback                        |
| `classNameTable`  | String/Array |  class name(s) for table element     |
| `classNameThead`  | String/Array |  class name(s) for thead element     |
| `classNameTbody`  | String/Array |  class name(s) for tbody element     |
| `classNameSelect` | String/Array |  class name(s) for select elements   |
| `classNameRow`    | String/Array |  class name(s) for row elements      |
| `classNameCell`   | String/Array |  class name(s) for cell elements     |
| `fullwidth`   | Boolean | 是否全宽度   |
| `bordered`   | Boolean | 为所有单元格添加边框   |
| `hoverable`   | Boolean | 在每行上添加悬停效果    |
| `striped`   | Boolean | 在表中添加条纹    |
| `narrow`   | Boolean | 使单元格变窄     |
| `custom`   | Boolean | 自定义列    |
| `tWidth`   | String | 宽度   |
| `tHeight`   | String | 高度    |
| `fixedHeader`   | Boolean | 固定表头,固定表头时需要设置父级div高度或者自定义`tHeight`。    |
| `activedRowKey`   | Array | 选中key    |
| `key`   | String | 唯一id，设置激活行时必须设置    |


### Events

点击事件

- clickCell: `event`, `col`, `key`
- clickRow: `event`, `row`
- clickCol: `event`, `row`, `key`
- checked: `event`,`checkbox`

_‡_ 字段允许双向绑定



## 列配置

| Option            | Type           | Description                                                                             |
| ----------------- | -------------- | --------------------------------------------------------------------------------------- |
| `key`             | String         | 数据唯一key                                                     |
| `title`           | String         | 显示标题                                                                        |
| `[class]`         | String         | 单元格指定样式类名                                                       |
| `[sortable]`      | Boolean        | 是否开启排序                                    |
| `[filterOptions]` | Array/Function | _optional_ array of objects with `name` and `value`. Function is provided array of rows |
| `[filterValue]`   | String         | 要过滤的值，通常与值相同                                   |
| `[headerClass]`   | String         | 标题头指定样式类名                                                   |
| `[renderValue]`   | Function       | 自定义呈现渲染html                                   |
| `component`   | Boolean | 展示自定义组件,目前只允许针对某一列进行设置   |


## 样式配置
在引入bluma的scss样式下，我们可以使用变量来控制表格风格样式。

| Name            | Type           | Default value  | 	Computed value  |
| --------------------------------------------------------------------------------------- | -------------- |  -------------- | -------------- | 
| $table-color	| color	| $text-strong	| hsl(0, 0%, 21%) |
| $table-background-color|	color|	$scheme-main|	hsl(0, 0%, 100%)|
| $table-cell-border	|size	|1px solid $border	||
| $table-cell-border-width	|size|	0 0 1px	||
| $table-cell-padding	|size	|0.5em 0.75em	||
| $table-cell-heading-color|	color|	$text-strong|	hsl(0, 0%, 21%)|
| $table-head-cell-border-width|	size|	0 0 2px	||
| $table-head-cell-color|	color	|$text-strong|	hsl(0, 0%, 21%)|
| $table-foot-cell-border-width|	size|	2px 0 0	||
| $table-foot-cell-color	|color|	$text-strong|	hsl(0, 0%, 21%)|
| $table-head-background-color|	string	|transparent	||
| $table-body-background-color	|string	|transparent	||
| $table-foot-background-color|	string	|transparent	||
| $table-row-hover-background-color	|color	|$scheme-main-bis	|hsl(0, 0%, 98%)|
| $table-row-active-background-color	|color	|$primary	|hsl(171, 100%, 41%)|
| $table-row-active-color|	color	|$primary-invert|	#fff|
| $table-striped-row-even-background-color	| color	|$scheme-main-bis	|hsl(0, 0%, 98%)|
| $table-striped-row-even-hover-background-color |	color	|$scheme-main-ter|	hsl(0, 0%, 96%)|
| $table-colors |	function|	$colors	|mergeColorMaps(("white": ($white, $black), "black": ($black, $white), "light": ($light, $light-invert), "dark": ($dark, $dark-invert), "primary": ($primary, $primary-invert, $primary-light, $primary-dark), "link": ($link, $link-invert, $link-light, $link-dark), "info": ($info, $info-invert, $info-light, $info-dark), "success": ($success, $success-invert, $success-light, $success-dark), "warning": ($warning, $warning-invert, $warning-light, $warning-dark), "danger": ($danger, $danger-invert, $danger-light, $danger-dark)), $custom-colors)|



## 案例

```html
<script>
  import Table from "../../Table";
  const rows = [
    /** 数据体 */
  ];
  const columns = [
    /** 列设置 */
  ];
</script>

<Table columns="{columns}" rows="{rows}"></Table>
```
## Sample Data and config

```js
// define some sample data...
const rows = [
  { id: 1, first_name: "Marilyn", last_name: "Monroe", gender: "female" },
  { id: 2, first_name: "Abraham", last_name: "Lincoln", gender: "male" },
  { id: 3, first_name: "Mother", last_name: "Teresa", gender: "female" },
  { id: 4, first_name: "John F.", last_name: "Kennedy", gender: "male" },
  { id: 5, first_name: "Martin Luther", last_name: "King", gender: "male" },
  { id: 6, first_name: "Nelson", last_name: "Mandela", gender: "male" },
  { id: 7, first_name: "Winston", last_name: "Churchill", gender: "male" },
  { id: 8, first_name: "George", last_name: "Soros", gender: "male" },
  { id: 9, first_name: "Bill", last_name: "Gates", gender: "male" },
  { id: 10, first_name: "Muhammad", last_name: "Ali", gender: "male" },
  { id: 11, first_name: "Mahatma", last_name: "Gandhi", gender: "male" },
  { id: 12, first_name: "Margaret", last_name: "Thatcher", gender: "female" },
  { id: 13, first_name: "Christopher", last_name: "Columbus", gender: "male" },
  { id: 14, first_name: "Charles", last_name: "Darwin", gender: "male" },
  { id: 15, first_name: "Elvis", last_name: "Presley", gender: "male" },
  { id: 16, first_name: "Albert", last_name: "Einstein", gender: "male" },
  { id: 17, first_name: "Paul", last_name: "McCartney", gender: "male" },
  { id: 18, first_name: "Queen", last_name: "Victoria", gender: "female" },
  { id: 19, first_name: "Pope", last_name: "Francis", gender: "male" }
  // etc...
];

// define column configs
const columns = [
  {
    key: "id",
    title: "ID",
    sortable: true,
    filterOptions: rows => {
      // generate groupings of 0-10, 10-20 etc...
      let nums = {};
      rows.forEach(row => {
        let num = Math.floor(row.id / 10);
        if (nums[num] === undefined)
          nums[num] = { name: `${num * 10} to ${(num + 1) * 10}`, value: num };
      });
      // fix order
      nums = Object.entries(nums)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(nums);
    },
    filterValue: v => Math.floor(v.id / 10),
    headerClass: "text-left"
  },
  {
    key: "first_name",
    title: "FIRST_NAME",
    sortable: true,
    filterOptions: rows => {
      // use first letter of first_name to generate filter
      let letrs = {};
      rows.forEach(row => {
        let letr = row.first_name.charAt(0);
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase()
          };
      });
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(letrs);
    },
    filterValue: v => v.first_name.charAt(0).toLowerCase()
  },
  {
    key: "last_name",
    title: "LAST_NAME",
    sortable: true,
    filterOptions: rows => {
      // use first letter of last_name to generate filter
      let letrs = {};
      rows.forEach(row => {
        let letr = row.last_name.charAt(0);
        if (letrs[letr] === undefined)
          letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase()
          };
      });
      // fix order
      letrs = Object.entries(letrs)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
      return Object.values(letrs);
    },
    filterValue: v => v.last_name.charAt(0).toLowerCase()
  },
  {
    key: "gender",
    title: "GENDER",
    renderValue: v => v.gender.charAt(0).toUpperCase() + v.gender.substring(1), // capitalize
    sortable: true,
    filterOptions: ["male", "female"] // provide array
  }
];
```