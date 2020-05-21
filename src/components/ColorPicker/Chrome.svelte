<svelte:options accessors={true} />

<style>
  .color-picker{
    display: flex;
    flex-direction: column;
    width: 14.5em;
    box-shadow: 0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3);
    background: #fff;
  }

  .color-picker :global(.saturation-value){
    height: 9em; /* 14.5 / 1.618 */
  }

  .sliders-and-square{
    display: flex;
    flex-direction: row;
    margin-top: 1em;
  }

  .square-wrap{
    width: 2em;
    height: 2em;
    border-radius: 1.5em;
    margin: auto 1.25em auto 0.75em;
    flex: none;
    overflow: hidden;
  }

  .sliders{
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: auto 1em auto 0;
  }

  .alpha-wrap{
    margin-top: 0.75em;
  }

  .inputs-and-changer{
    display: flex;
    flex-direction: row;
    padding: 1em 0.5em;
  }

  .changer-wrap{
    box-sizing: border-box;
    width: 2em;
    flex: none;
    margin: auto;
    padding-left: 0.5em;
  }

  .changer-up, .changer-down{
    margin: auto;
    cursor: pointer;
  }

  .changer-up {
    width: 0; 
    height: 0; 
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    border-bottom: 0.5em solid #666;
  }

  .changer-down {
    width: 0; 
    height: 0; 
    border-left: 0.5em solid transparent;
    border-right: 0.5em solid transparent;
    border-top: 0.5em solid #666;
    margin-top: 0.5em;
  }

  .inputs-wrap{
    flex: 1;
  }

  input{
    text-align: center;
    outline: 0;
    box-shadow: none;
    font-family: inherit;
    font-size: 0.7em;
    display: block;
    width: auto;
    border: #ddd 1px solid;
    border-radius: 0.1em;
    padding: 0.25em 0;
  }

  .hex{
    width: 100%;
    margin: auto;
  }

  .rgba-wrap, .hsla-wrap{
    display: flex;
  }

  .rgba-wrap > div:not(:first-child),
  .hsla-wrap > div:not(:first-child){
    margin-left: 0.5em;
  }
  
  .rgba-wrap input,
  .hsla-wrap input{
    width: 100%;
  }

  .percent-input{
    position: relative;
  }

  .percent-input:after{
    content: "%";
    display: block;
    position: absolute;
    top: 50%;
    transform: translate(-50%);
    right: 0.25em;
  }

  label{
    display: block;
    text-transform: uppercase;
    text-align: center;
    margin-top: 0.5em;
    font-size: 0.8em;
    color: #666;
  }
</style>

<script>
  import {createEventDispatcher} from "svelte";
  const dispatch = createEventDispatcher();
  // input

  import tinycolor from "tinycolor2";
  import {getValidColor} from "./utils.js"

  import SaturationValue from "./SaturationValue.svelte";
  import Alpha from "./Alpha.svelte"
  import Hue from "./Hue.svelte";
  import ColorSquare from "./ColorSquare.svelte";

  // RED
  export let h = 0;
  export let s = 1;
  export let v = 1;
  export let l = 0.5;
  export let r = 255;
  export let g = 0;
  export let b = 0;
  export let hex = "#ff0000";
  export let a = 1;
  
  export let color;
  $: color = {r, g, b, h, s, l, v, a, hex};

  export let startColor = "#ff0000"; // all tinycolor colors
  export let disableAlpha = false;

  export let fieldsIndex = 0;

  export const setColor = (args) => update(args, false); 

  const update = (args, dispatch=true) => {

    // is not enough with color.isValidColor
    const color = getValidColor(args);
    if(!color) return;

    const format = color.getFormat();
    // we dont use hex8
    (format === "hex" || format === "hex8") && color.setAlpha(a);
    const _rgba = color.toRgb();
    const _hsla = color.toHsl();
    const _hsva = color.toHsv();
    const _hex = `#${color.toHex()}`;

    r = args.r != null ? args.r : _rgba.r;
    g = args.g != null ? args.g : _rgba.g;
    b = args.b != null ? args.b : _rgba.b;
    h = args.h != null ? args.h : _hsla.h;
    s = args.s != null ? args.s : _hsla.s;
    l = args.l != null ? args.l : _hsla.l;
    v = args.v != null ? args.v : _hsva.v;
    a = args.a != null ? args.a : _rgba.a;
    hex = format === "hex" ? args : _hex;
    
    dispatch && dispatchInput();
  }

  const updateAlpha = (alpha) => {
    if(isNaN(alpha) || alpha < 0 || alpha > 1)
      return;

    a = alpha;
    dispatchInput()
  }
  
  const dispatchInput = () =>{
    const value = getcolorValue();
    dispatch("input", value)
  } ;

  const onlyChars = (chars) => (event) => chars.indexOf(String.fromCharCode(event.charCode)) === -1 && event.preventDefault();
  const onlyNumbers = onlyChars("0123456789");
  const onlyNumbersAndDot = onlyChars("0123456789.");

  update(startColor, false);


  function getcolorValue(){
    switch(fieldsIndex){
      case 1:
          const rgba = `rgba(${color.r},${color.g},${color.b},${color.a})`;
         return rgba;
        break;
      case 2:
        const hsla = `hsla(${Math.round(color.h) % 360},${Math.round(color.s * 100)}%,${Math.round(color.l * 100)}%,${Math.round(color.a * 100) / 100})`;
         return hsla;
        break;
      default:
        const hex = color.hex;
        return hex;
    }
  }
</script>

<div class="color-picker">
  
  <div class="saturation-value-wrap">
    <SaturationValue {h} {s} {v} on:input={(event) => update({h, s: event.detail.s, v: event.detail.v, a})} />
  </div>

  <div class="sliders-and-square">
    
    <div class="square-wrap">
      <ColorSquare color="rgba({r}, {g}, {b}, {a})"/>
    </div>

    <div class="sliders">
      <div class="hue-wrap">
        <Hue {h} on:input={event => update({h: event.detail, s, v, a})} />
      </div>

      {#if !disableAlpha}
        <div class="alpha-wrap">
          <Alpha bind:a color={hex} on:input={dispatchInput}/>
        </div>
      {/if}
    </div>
  </div>

  <div class="inputs-and-changer">
   
    <div class="inputs-wrap">
      {#if fieldsIndex === 0}
        <div class="input-wrap hex-wrap">
          <input 
            class="hex"
            type="text"
            value={hex}
            maxlength={7}
            on:keypress={onlyChars("#0123456789abcdefABCFDEF")}
            on:input={event => update(event.target.value)}
          />
          <label>hex</label>
        </div>
      {:else if fieldsIndex === 1}
        <div class="rgba-wrap">
          <div class="input-wrap">
            <input
              class="rgba"
              type="text"
              value={r}
              maxlength={3}
              on:keypress={onlyNumbers}
              on:input={event => update({r: parseInt(event.target.value), g, b, a})}
            />
            <label>r</label>
          </div>
          <div class="input-wrap">
            <input
              class="rgba"
              type="text"
              value={g}
              maxlength={3}
              on:keypress={onlyNumbers}
              on:input={event => update({r, g: parseInt(event.target.value), b, a})}
            />
            <label>g</label>
          </div>
          <div class="input-wrap">
            <input class="rgba"
              type="text"
              value={b}
              maxlength={3}
              on:keypress={onlyNumbers}
              on:input={event => update({r, g, b: parseInt(event.target.value), a})}
            />
            <label>b</label>
          </div>
          {#if !disableAlpha}
            <div class="input-wrap">
              <input
                class="rgba"
                type="text"
                value={Math.round(a * 100) / 100}
                maxlength={4}
                on:keypress={onlyNumbersAndDot}
                on:input={event => updateAlpha(parseFloat(event.target.value))}
              />
              <label>a</label>
            </div>
          {/if}
        </div>
      {:else if fieldsIndex === 2}
        <div class="hsla-wrap">
          <div class="input-wrap">
            <input class="hsla"
              value={Math.round(h) % 360}
              type="text"
              maxlength={3}
              on:keypress={onlyNumbers}
              on:input={event => update({h: parseInt(event.target.value), s, l, a})}
            />
            <label>h</label>
          </div>
          <div class="input-wrap">
            <input
              class="hsla percent-input"
              value="{Math.round(s * 100)}%"
              type="text"
              maxlength={4}
              on:keypress={onlyNumbers}
              on:input={event => update({h, s: parseFloat(event.target.value) / 100, l, a})}
            />
            <label>s</label>
          </div>
          <div class="input-wrap">
            <input
              class="hsla percent-input"
              value="{Math.round(l * 100)}%"
              type="text"
              maxlength={4}
              on:keypress={onlyNumbers}
              on:input={event => update({h, s, l: parseFloat(event.target.value) / 100, a})}
            />
            <label>l</label>
          </div>
          {#if !disableAlpha}
            <div class="input-wrap">
              <input
                class="hsla"
                value={Math.round(a * 100) / 100}
                type="text"
                maxlength={4}
                on:keypress={onlyNumbersAndDot}
                on:input={event => updateAlpha(parseFloat(event.target.value))}
              />
              <label>a</label>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <div class="changer-wrap">
      <div class="changer-up" on:click={() => fieldsIndex = (fieldsIndex === 0 ? 2 : (fieldsIndex - 1) % 3)}></div>
      <div class="changer-down" on:click={() => fieldsIndex = (fieldsIndex + 1) % 3}></div>
    </div>
  </div>

</div> 