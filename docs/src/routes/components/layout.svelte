<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/layout.json`)
    const jsdoc = await res.json()

    return { jsdoc }
  }
</script>
<script>
  import { Layout, Children } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'

    import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc
</script>

<DocHeader title="Layout" subtitle="布局" />

<Example
  code={`<script>
  import { Layout, Children } from 'svelma-pro';
</script>

<Layout>
  <Children.Sider width="100px">
    侧边栏
  </Children.Sider>
  <Layout>
    <Children.Header>
      头部
    </Children.Header>
    <Children.Content height="300px">
      内容
    </Children.Content>
    <Children.Footer>
      脚部
    </Children.Footer>
  </Layout>
</Layout>
`}>
  <div slot="preview">
    <Layout>
      <Children.Sider width="100px">侧边栏</Children.Sider>
      <Layout>
        <Children.Header>头部</Children.Header>
        <Children.Content height="300px">内容</Children.Content>
        <Children.Footer>脚部</Children.Footer>
      </Layout>
    </Layout>
  </div>
</Example>

<JSDoc {jsdoc} />