<script context="module">
	export async function preload() {
		const res = await this.fetch(`components/collapse.json`);
    const jsdoc = await res.json();

		return { jsdoc };
	}
</script>

<script>
  import { Collapse, CollapseItem } from 'svelma-pro'
  import DocHeader from '../../components/DocHeader.svelte'
  import Example from '../../components/Example.svelte'
  import JSDoc from '../../components/JSDoc.svelte'

  export let jsdoc


  let activeNames1 = '1';

  function change(e) {
    console.log(e.detail)
  }
</script>
<style>
  .notification {
    background-color: #ffffff;
    margin: 0;
  }
</style>

<DocHeader title="Collapse" subtitle="可折叠元素" />


<p class="title is-4">基础用法</p>
<Example code={`<script>
  import { Collapse, CollapseItem } from 'svelma-pro'

  let activeNames = ['1', '2'];

  function change(e) {
    console.log(e.detail)
  }
</script>

<Collapse activeNames={activeNames} on:change={change}>
  <CollapseItem title="Click Me!" name='1'>
    <div class="notification">
      <div class="content">
        <h3>Subtitle</h3>
        <p>Lorem ipsum dolor...</p>
      </div>
    </div>
  </CollapseItem>
  <CollapseItem title="娱乐新闻" name='2'>
    <div class="notification"> 
      <div class="content">
        <p>娱乐八卦天天有</p>
      </div>
    </div>
  </CollapseItem>
  <CollapseItem title="体育新闻" name='3'>
    <div class="notification"> 
      <div class="content">
        <p>这里有你最喜欢的体育趣闻</p>
      </div>
    </div>
  </CollapseItem>
</Collapse>`}>
  <div slot="preview">
    <Collapse activeNames={activeNames1} on:change={change}>
      <CollapseItem title="Click Me!" name='1'>
        <div class="notification">
          <div class="content">
            <h3>Subtitle</h3>
            <p>Lorem ipsum dolor...</p>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem title="娱乐新闻" name='2'>
        <div class="notification"> 
          <div class="content">
            <p>娱乐八卦天天有</p>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem title="体育新闻" name='3'>
        <div class="notification"> 
          <div class="content">
            <p>这里有你最喜欢的体育趣闻</p>
          </div>
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</Example>
<hr class="is-medium" />

<p class="title is-4">手风琴模式</p>
<Example code={`<script>
  import { Collapse, CollapseItem } from 'svelma-pro'

  let accordion = true;

  function change(e) {
    console.log(e.detail)
  }
</script>

<Collapse accordion activeNames='1'  on:change={change}>
  <CollapseItem active="{true}" title="目录一" name="1">
    <div class="notification">
      <div class="content">
        <h3>Subtitle</h3>
        <p>Lorem ipsum dolor...</p>
      </div>
    </div>
  </CollapseItem>
  <CollapseItem title="目录二" name="3">
    <div class="notification">
      <div class="content">
        <p>我最喜欢的颜色</p>
      </div>
    </div>
  </CollapseItem>
</Collapse>`}>
  <div slot="preview">
    <Collapse accordion activeNames='1'>
      <CollapseItem title="目录一" name="1">
        <div class="notification">
          <div class="content">
            <h3>Subtitle</h3>
            <p>Lorem ipsum dolor...</p>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem title="目录二" name="2">
        <div class="notification">
          <div class="content">
            <p>我最喜欢的颜色</p>
          </div>
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</Example>
<hr class="is-medium" />

<p class="title is-4">自定义面板标题</p>
<Example code={`<script>
  import { Collapse, CollapseItem } from 'svelma-pro'

</script>

<Collapse>
  <CollapseItem name="1">
    <div slot="title">
      我是自定义面板!
      <i class="fa fa-check"></i>
    </div>
    <div class="notification">
      <div class="content">
        <h3>Subtitle</h3>
        <p>Lorem ipsum dolor...</p>
      </div>
    </div>
  </CollapseItem>
  <CollapseItem title="我是标题面板" name="2">
    <div class="notification">
      <div class="content">
        <p>我最喜欢的颜色</p>
      </div>
    </div>
  </CollapseItem>
</Collapse>`}>
  <div slot="preview">
    <Collapse>
      <CollapseItem name="1">
        <div slot="title">
          我是自定义面板!
          <i class="fa fa-check"></i>
        </div>
        <div class="notification">
          <div class="content">
            <h3>Subtitle</h3>
            <p>Lorem ipsum dolor...</p>
          </div>
        </div>
      </CollapseItem>
      <CollapseItem title="我是标题面板" name="2">
        <div class="notification">
          <div class="content">
            <p>我最喜欢的颜色</p>
          </div>
        </div>
      </CollapseItem>
    </Collapse>
  </div>
</Example>

<JSDoc {jsdoc} showEvent="true"></JSDoc>















    <!-- <Collapse>
      <button class="button is-primary" slot="trigger">Click Me!</button>
      <div class="notification">
        <div class="content">
          <h3>Subtitle</h3>
          <p>Lorem ipsum dolor...</p>
        </div>
      </div>
    </Collapse> -->