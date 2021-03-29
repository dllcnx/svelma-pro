<script>
    import {createEventDispatcher, onMount} from "svelte";
    import handle from "./index.js";

    const dispatch = createEventDispatcher();
    let active;
    export let pos;
    export let value;
    export let tip;

    function dragstart() {
        active = true;
        dispatch('active', true)
    }

    function dragend() {
        active = false;
        dispatch('active', false);
        dispatch('dragEnd', value);
    }

</script>

<style>
    .sli-tip {
        position: absolute;
        bottom: 0px;
        background: #000;
        padding: 5px;
        border-radius: 5px;
        color: #fff;
        transform: translate(-50%, -50%);
    }

    .sli-tip::after {
        content: "";
        width: 0;
        bottom: -10px;
        left: calc(50% - 5px);
        position: absolute;
        height: 0;
        border: 5px solid transparent;
        border-top-color: #000;
    }

    .thumb {
        position: absolute;
        top: 50%;
        width: 0;
        height: 0;
    }

    .thumb-content {
        position: relative;
        width: fit-content;
        height: fit-content;
        transform: translate(-50%, -50%);
    }

    .thumb-content::before {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        transform: translate(-25%, -25%) scale(0);
        border-radius: 100vh;
        background: var(--thumb-background, #5784fd);
        opacity: 30%;
        transition: transform 100ms ease-in-out;
    }

    .thumb-content.active::before {
        transform: translate(-25%, -25%) scale(1);
    }
</style>

<div class="thumb"
     style={`left: ${pos * 100}%;`}
     use:handle
     on:dragstart={dragstart}
     on:dragend={dragend}
     on:drag={({ detail: v }) => (pos = v)}>
    {#if tip}
        <div class="sli-tip">{value}</div>
    {/if}
    <div class="thumb-content" class:active>
        <slot/>
    </div>
</div>
