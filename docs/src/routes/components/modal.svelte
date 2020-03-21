<script context="module">
  export async function preload() {
    const res = await this.fetch(`components/modal.json`);
    const jsdoc = await res.json();

    return { jsdoc };
  }
</script>
<script>
  import { Button, Modal } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc


  let active = false
</script>

<DocHeader title="Modal" subtitle="模态框" />

<Example code={`<script>
  import { Button, Modal } from 'svelma-pro'
  
  let active = false
</script>

<Button class="block" on:click={() => active = !active}>Toggle</Button>
<Modal bind:active={active}>
  <p class="image is-4by3">
    <img alt="Test image" src="https://via.placeholder.com/1280x920"/>
  </p>
</Modal>`}>
  <div slot="preview">
    <Button class="block" on:click={() => active = !active}>Toggle</Button>
    <Modal bind:active={active}>
      <p class="image is-4by3">
        <img alt="Test image" src="https://via.placeholder.com/1280x920"/>
      </p>
    </Modal>
  </div>
</Example>

<JSDoc {jsdoc}/>