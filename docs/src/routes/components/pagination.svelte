<script>
  import {Pagination} from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
</script>

<DocHeader title="Pagination" subtitle="分页" />

<Example
  code={`<script>
import {Pagination} from 'svelma-pro'
</script>

<Pagination current="1" total="10" show="5" align="centered" />
`}>
 <div slot="preview">
    <Pagination current="1" total="10" show="5" align="centered" />
 </div>
</Example>
