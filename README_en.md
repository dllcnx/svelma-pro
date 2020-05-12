


# svelma-pro

* [中文文档](README.md)

Based on [svelma](https://github.com/c0bra/svelma) project extension and modification, thanks to the original author components such as c0bra and bulma
Based on the original component library, some common components and bug fixes are extended, and the functions of some components are modified.


# Documentation

[See docs + demos site here](http://www.myllcn.com/svelma-pro/)

# Quick Start

### 1. Create a svelte app(or sapper app) from the template

[https://github.com/sveltejs/template](sveltejs/template) is a template repo for svelte. [degit](https://www.npmjs.com/package/degit) will scaffold the repo for you:

    $ npx degit sveltejs/template my-svelma-project
    $ cd my-svelma-project
    $ npm install


### 2. Install svelma and dependencies

#### bulma and svelma-pro

    $ npm install --save bulma svelma-pro

#### scss

     $ npm install --save-dev svelte-preprocess autoprefixer node-sass sass


### 3. config
Add the scss plugin to your rollup(webpack) config:

```js
// rollup.config.js
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
// webpack.config.js
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

### 4. Import Bulma's CSS and Svelma components

```html

<!-- main.js or client.js(sapper) -->
<script>
  import 'bulma/css/bulma.css'
</script>
```

### 5. Include [Font Awesome](https://fontawesome.com/) icons

From CDN in your HTML page:

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"></link>
```

...or as an npm package imported into your root component:

    $ npm install --save @fortawesome/fontawesome-free

```html
 <!-- main.js or client.js(sapper) -->
<script>
  import 'bulma/css/bulma.css'
  import '@fortawesome/fontawesome-free/css/all.css'
</script>
```
