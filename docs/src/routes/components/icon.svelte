<script>
  import { Icon } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
</script>

<DocHeader title="Icon" subtitle="浮标" />

<Example code={`<script>
  import { Icon } from 'svelma-pro'
</script>

<Icon pack="fab" size="is-large" icon="github" />
`}>
  <div slot="preview">
    <Icon pack="fab" size="is-large" icon="github"/>
  </div>
</Example>

<hr class="is-medium" />

<p class="title is-4">添加角标</p>

<Example code={`<script>
  import { Icon } from 'svelma-pro'
</script>

<Icon pack="fab" size="is-large" icon="github" num="99"/>
`}>
  <div slot="preview">
    <Icon pack="fab" size="is-large" icon="github"  num="99"/>
  </div>
</Example>