<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/nav.json`)
    const res2 = await this.fetch(`components/navItem.json`)
    const res3 = await this.fetch(`components/navLayout.json`)
    const jsdoc = await res.json()
    const jsdocItem = await res2.json()
    const jsdocLayout = await res3.json()

    return {
      jsdoc,
      jsdocItem,
      jsdocLayout
    }
  }
</script>
<script>
  import {
    Nav,
    NavItem,
    NavLayout,
    Button
  } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'

  import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc
  export let jsdocItem
  export let jsdocLayout
</script>

<DocHeader title="Nav" subtitle="导航" />

<Example code={`<script>
  import { Nav, NavItem, NavLayout } from 'svelma-pro'
  </script>

  <Nav logoImg="/logo-192.png">
    <NavLayout navPosition="center">
      <NavItem>管理工具</NavItem>
      <NavItem>开发资源</NavItem>
    </NavLayout>
    <NavLayout navPosition="end">
      <NavItem>
        <Button type="is-link">登录</Button>
      </NavItem>
    </NavLayout>
  </Nav>
  `}>
  <div slot="preview" style="position: relative;">
    <Nav logoImg="/logo-192.png">
      <NavLayout navPosition="center">
        <NavItem>管理工具</NavItem>
        <NavItem>开发资源</NavItem>
      </NavLayout>
      <NavLayout navPosition="end">
        <NavItem>
          <Button type="is-link">登录</Button>
        </NavItem>
      </NavLayout>
    </Nav>
  </div>
</Example>

<hr class="is-medium" />

<p class="title is-4">下拉列表</p>

<Example code={`<script>
  import { Nav, NavItem, NavLayout } from 'svelma-pro'
  </script>

  <Nav logoImg=/logo-192.png" background="rgba(0,0,0)">
    <NavItem isHover={true}>
      <span style="color:#fff">管理工具</span>
      <div slot="hover">
        <NavItem>开发资源</NavItem>
        <NavItem>开发资源</NavItem>
        <NavItem>开发资源</NavItem>
      </div>
    </NavItem>
    <NavItem><span style="color:#fff">开发资源</span></NavItem>
  </Nav>
  `}>
  <div slot="preview" style="position: relative;">
    <Nav logoImg="/logo-192.png" background="rgba(0,0,0)">
      <NavItem isHover={true}>
        <span style="color:#fff">管理工具</span>
        <div slot="hover">
          <NavItem>开发资源</NavItem>
          <NavItem>开发资源</NavItem>
          <NavItem>开发资源</NavItem>
        </div>
      </NavItem>
      <NavItem><span style="color:#fff">开发资源</span></NavItem>
    </Nav>
  </div>
</Example>

<hr class="is-medium" />

<h2 class="title is-4 is-spaced">API</h2>

<h3 class="subtitle">Nav</h3>

<JSDoc {jsdoc} showHeader={false} />

<br>
<br>

<h3 class="subtitle is-spaced">NavItem</h3>

<JSDoc jsdoc={jsdocItem} showHeader={false}></JSDoc>

<br>
<br>

<h3 class="subtitle is-spaced">NavLayout</h3>

<JSDoc jsdoc={jsdocLayout} showHeader={false}></JSDoc>