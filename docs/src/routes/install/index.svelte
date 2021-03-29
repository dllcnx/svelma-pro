<script>
  import { Message } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Codeview from '../../components/Code.svelte'
</script>

<DocHeader title="Start" subtitle="如何使用" />
<br/>
<br/>
<div class="media">
  <div class="media-left">
    <p class="title">1</p>
  </div>
  <div class="media-content">
    <p class="title">NPM</p>
    <p class="subtitle is-spaced">此组件库适用于基于rollup或者webpack搭建的svelte及sapper项目</p>
    <p class="title is-4">下载安装</p>

    <div class="content">下载bluma与组件库.</div>

    <Codeview lang="bash">npm install --save bulma svelma-pro</Codeview>

    <div class="content">集成scss模板语法支持(因为组件库采用了类似vue的scss模板写法,所以需要也集成进去).</div>

    <Codeview lang="bash">npm install --save-dev svelte-preprocess autoprefixer node-sass sass</Codeview>

    <div class="content">
      添加
      <code>scss编译</code>
      到你的
      <code>rollup.config.js</code>
      配置文件中(或者webpack.config.js).
    </div>

    <Codeview
      lang="js"
      code={`import sveltePreprocess from 'svelte-preprocess';
const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src'],
  },
  postcss: {
    plugins: [require('autoprefixer')],
  },
});

// ...

export default {
  // ... 
  plugins: [
    svelte({
      // ...
      preprocess: preprocess,
    })
  ]
}`} />

   <div class="content">
      如果使用webpack,在
      <code>webpack.config.js</code>
      配置文件中.
    </div>
    <Codeview
      lang="js"
      code={`import sveltePreprocess from 'svelte-preprocess';
const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src'],
  },
  postcss: {
    plugins: [require('autoprefixer')],
  },
});

// ...

module.export = {
  // ... 
  module: {
    rules: [
      {
        test: /\.(svelte|html)$/,
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
}`} />

    <p class="title is-4">使用</p>
    <div class="content">引入bluma样式到您的项目</div>
    <Codeview lang="html" code={`
<!-- main.js或者client.js全局引入 -->
<script>
  import 'bulma/css/bulma.css'
</script>
    `}>
    </Codeview>

    <div class="content">
      svelma-pro组件可以一次导入一个，就像这样
    </div>
    <Codeview lang="html" code={`
<script>
  import { Button } from 'svelma-pro'
</script>

<Button>I am a Button</Button>
    `}>
    </Codeview>

    <div class="content">
      或导入完整的Svelma软件包。
    </div>
    <Codeview lang="html" code={`
<script>
  import { Svelma } from 'svelma-pro'
</script>

<Svelma.Button>I am a Button</Svelma.Button>
    `}>
    </Codeview>
    
  </div>
</div>

<hr class="is-medium">

<div class="media">
  <div class="media-left">
    <p class="title">2</p>
  </div>
  <div class="media-content">
    <p class="title is-spaced">使用 [Font Awesome] 图标</p>

    添加 CDN 在你的 HTML 页面:
    <Codeview lang="bash" code={`
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></link>
`}/>
    ...或者使用npm包:
    <Codeview lang="bash" code={`npm install --save @fortawesome/fontawesome-free`}/>
<Codeview lang="bash" code={`<!-- main.js or client.js(sapper) -->
<script>
  import '@fortawesome/fontawesome-free/css/all.css'
</script>`}/>

 </div>
</div>