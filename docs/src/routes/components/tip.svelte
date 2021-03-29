<script>
  import { Tip,Button } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'

let config = {
    content: '<div class="tooltip">Styled tooltip text</div>',
    allowHTML: true,
    trigger: 'click',
    onShow: function(instance) {
    console.log(instance);
    }
  }
</script>

<style>
  :global(.tooltip) {
    color: orange;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>

<DocHeader title="Tip" subtitle="提示" />

<Example code={`<script>
  import { Tip } from 'svelma-pro'
</script>

<Tip content="你好"></Tip>
`}>
  <div slot="preview">
    <Tip content="你好">
      <Button type="is-link">Link</Button>
    </Tip>
  </div>
</Example>

<hr class="is-medium" />

<p class="title is-4">自定义设置</p>
<p class="content">更多配置请参考<a href="https://atomiks.github.io/tippyjs/">tippy</a>.</p>

<Example code={`<script>
import { Tip } from 'svelma-pro'

let config = {
    content: '<div class="tooltip">Styled tooltip text</div>',
    allowHTML: true,
    trigger: 'click',
    onShow: function(instance) {
        console.log(instance);
}
</script>

<style>
  :global(.tooltip) {
    color: orange;
    font-weight: bold;
    text-transform: uppercase;
  }
</style>

<Tip config="{config}">
   <Button type="is-link">Link</Button>
</Tip>
`}>
  <div slot="preview">
    <Tip config={config}>
        <Button type="is-link">Link</Button>
    </Tip>
  </div>
</Example>