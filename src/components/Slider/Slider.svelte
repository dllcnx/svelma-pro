<script>
    import {createEventDispatcher} from "svelte";
    import Thumb from "./Thumb.svelte";

    const dispatch = createEventDispatcher();

    export let name = [];
    export let range = false;
    export let min = 0;
    export let max = 100;
    export let step = 1;
    export let value = [min, max];
    export let pos;
    export let active = false;
    export let order = false;
    export let tip = false;
    export let tipRender;

    $: if (active) setValue(pos);
    $: if (!active) setPos(value);
    $: if (range && order && active) pos = checkPos(pos);
    $: min, max, clamp();
    $: progress = `
    left: ${range ? Math.min(pos[0], pos[1]) * 100 : 0}%;
    right: ${100 - Math.max(pos[0], (range ? pos[1] : pos[0])) * 100}%;
  `;

    function setValue(pos) {

        const offset = min % step;
        const width = max - min
        value = pos
                .map(v => {
                    const t = min + v * width;
                    return t;
                })
                .map(v => {
                    let r;
                    if(step < 1){
                        const digit = getDigit(step);
                        const num1 = Math.round((v - offset) / step);
                        const num2 = step;
                        r = formatNum(num1 * num2, digit)
                    }else{
                         r = Math.round((v - offset) / step) * step + offset;
                    }
                    return r;
                });

        dispatch("change", value);
    }

    function setPos(value) {
        pos = value
                .map(v => Math.min(Math.max(v, min), max))
                .map(v => (v - min) / (max - min));
    }

    function checkPos(pos) {
        return [Math.min(...pos), Math.max(...pos)];
    }

    function clamp() {
        setPos(value);
        setValue(pos);
    }

    function getDigit(num) {
        const strs = num.toString().split(".");
        if (strs[1]) {
            return strs[1].length;
        } else {
            return 0;
        }
    }

    function formatNum(f, digit) {
        var m = Math.pow(10, digit);
        return parseInt(f * m, 10) / m;
    }
</script>

<style>
    input {
        display: none;
    }

    .track {
        margin: 16px 8px;
        position: relative;
        height: 4px;
        width: calc(100% - 16px);
        border-radius: 100vh;
        background: var(--track-background, #ebebeb);
    }

    .progress-sli {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 100vh;
        background: var(--progress-background, #8abdff);
    }

    .thumb {
        width: 16px;
        height: 16px;
        border-radius: 100vh;
        background: var(--thumb-background, #5784fd);
    }
</style>

<input type="number" value={value[0]} name={name[0]}/>
{#if range}
    <input type="number" value={value[1]} name={name[1]}/>
{/if}
<div class="track">
    <div
            class="progress-sli"
            style={progress}/>
    <Thumb bind:pos={pos[0]} on:active={({ detail: v }) => active = v} on:dragEnd value={value[0]} {tip} {tipRender}>
        <slot name="left">
            <slot>
                <div class="thumb"/>
            </slot>
        </slot>
    </Thumb>
    {#if range}
        <Thumb bind:pos={pos[1]} on:active={({ detail: v }) => active = v} on:dragEnd value={value[1]} {tip} {tipRender}>
            <slot name="right">
                <slot>
                    <div class="thumb"/>
                </slot>
            </slot>
        </Thumb>
    {/if}
</div>
