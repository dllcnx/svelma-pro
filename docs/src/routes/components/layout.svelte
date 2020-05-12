<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`components/layout.json`)
    const jsdoc = await res.json()

    return { jsdoc }
  }
</script>

<script>
  import { Layout, Header, Content, Sider, Footer } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'

  import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc
</script>

<DocHeader title="Layout" subtitle="布局" />

<Example
  code={`<script ✂prettier:content✂="CiAgaW1wb3J0IHsgTGF5b3V0LCBDaGlsZHJlbiB9IGZyb20gJ3N2ZWxtYS1wcm8nOwo=">{}</script><Layout>
  <Sider width="100px">
    侧边栏
  </Sider>
  <Layout>
    <Header>
      头部
    </Header>
    <Content height="300px">
      内容
    </Content>
    <Footer>
      脚部
    </Footer>
  </Layout>
</Layout>
`}>
  <div slot="preview">
    <Layout>
      <Sider width="100px">侧边栏</Sider>
      <Layout>
        <Header>头部</Header>
        <Content height="300px">内容</Content>
        <Footer>脚部</Footer>
      </Layout>
    </Layout>
  </div>
</Example>

<JSDoc {jsdoc} />
