


# svelma-pro

基于开源项目[svelma](https://github.com/c0bra/svelma) 扩展和修改.

原项目组件比较少,存在一些小bug,所以在原有的组件库的基础上，扩展了一些常见的组件,并对发现的一些bug进行了修改，对原有的组件功能,事件以及用户配置进行更人性化的修改和扩展。


# 文档

[文档及Demo](https://dllcnx.github.io/svelma-pro/)

# 快速开始

### 1. 通过template创建svelte应用(或者sapper应用)

[https://github.com/sveltejs/template](sveltejs/template) 是一个svelte的初始化模板. [degit](https://www.npmjs.com/package/degit)这个脚手架可以帮你获取它:

    $ npx degit sveltejs/template my-svelma-project
    $ cd my-svelma-project
    $ npm install


### 2. 引入bulma样式及svelma-pro组件等依赖

#### bulma and svelma-pro

    $ npm install --save bulma svelma-pro

### 3. scss支持

     因为组件库使用了sass样式扩展，所以需要项目可以编译sass语法。如果没有集成，可以参考此文档。


    
 [svelte-sass-template](https://github.com/KeiferJu/svelte-sass-template)

### 4. 引入Bulma的CSS样式和svelma-pro组件

```html

<!-- main.js or client.js(sapper) -->
<script>
  import 'bulma/css/bulma.css'
  import "/svelma-pro/src/svelma-pro.css";
</script>
```

### 5. 引入 [Font Awesome](https://fontawesome.com/) 图标:

在你的主HTML配置CDN页面:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></link>
```

...或者下载`fontawesome-free`包,引入到静态资产目录，通过html引入.
