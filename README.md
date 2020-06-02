


# svelma-pro

* [English Document](README_en.md)

基于开源项目[svelma](https://github.com/c0bra/svelma) 扩展和修改, 所以在此感谢原作者`c0bra`以及`bulma`,`svelte`等团队.

原项目组件比较少,存在一些小bug,所以我在在原有的组件库的基础上，扩展了一些常见的组件(例如时间,日期选择器,仿antd的layout布局,分页,等等),并对发现的一些bug进行了修改，对原有的组件功能,事件以及用户配置进行更人性化的修改和扩展。


# 文档

[文档及Demo](http://www.myllcn.com/svelma-pro/)

# 快速开始

### 1. 通过template创建svelte应用(或者sapper应用)

[https://github.com/sveltejs/template](sveltejs/template) 是一个svelte的初始化模板. [degit](https://www.npmjs.com/package/degit)这个脚手架可以帮你获取它:(PS: `Rich-Harris`大神被称为前端轮子哥果然是有有道理的,svelte,rollup,degit都是他的手笔)

    $ npx degit sveltejs/template my-svelma-project
    $ cd my-svelma-project
    $ npm install


### 2. 引入bulma样式及svelma-pro组件等依赖

#### bulma and svelma-pro

    $ npm install --save bulma svelma-pro

#### scss

     $ npm install --save-dev svelte-preprocess autoprefixer node-sass sass


### 3. config
在你的rollup或者webpack配置文件中添加scss支持:

```js
// rollup配置  rollup.config.js
import sveltePreprocess from 'svelte-preprocess';

// ...

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src'],
  },
  postcss: {
    plugins: [require('autoprefixer')],
  },
});

export default {
  // ... 
  plugins: [
    svelte({
      // ...
      preprocess: preprocess,
    })
  ]
}
```

```js
// webpack配置  webpack.config.js
import sveltePreprocess from 'svelte-preprocess';

// ...
const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src'],
  },
  postcss: {
    plugins: [require('autoprefixer')],
  },
});

module.export = {
  // ... 
  module: {
    rules: [
      {
        test: /.(svelte|html)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess, 
            // ...
          }
        }
      },
    ]
  },
  ]
}
```

### 4. 引入Bulma的CSS样式及组件库样式和svelma-pro组件

```html

<!-- main.js or client.js(sapper) -->
<script>
  import 'bulma/css/bulma.css'
  import 'svelma-pro/svelma-pro.css'
</script>
```

### 5. 引入 [Font Awesome](https://fontawesome.com/) 图标:

在你的主HTML配置CDN页面:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></link>
```

...或者通过npm包:

    $ npm install --save @fortawesome/fontawesome-free

```html
 <!-- main.js or client.js(sapper) -->
<script>
  import 'bulma/css/bulma.css'
  import '@fortawesome/fontawesome-free/css/all.css'
</script>
```
