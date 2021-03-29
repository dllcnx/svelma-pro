<script>
    import { onMount,createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    /* 引用组件 传值示例 */
    /*
    <Dropdown
                MulChoice={true}
                ArrayList={arrList}
                Noenable={false}
                Size={"large"}
                isNUll={false}
                Modify={"width:250px"}
                Choose={'3'} // 多选情况 {['2','1','3','5']}
                on:changSelect={select}
    ></Dropdown>
    function select(event) {
        event.detail.value  就是需要的返回的value值.
    }
    */
    /* 传入下列数据ArrayList 必须为 [{label: 'xxx',value: 'xxxx'}] */

    export let MulChoice = false;
    /* MulChoice 绑定值 为true或者传入任意都默认开启多选模式 */
    export let ArrayList;
    /* 下拉选项数组 */
    export let Modify;
    /* 传入样式参数 比如：{"width:100px"} */
    export let Noenable;
    /* 是否禁用 */
    export let Size = '';
    /* 大小包括 medium large  不写size参数为默认*/
    export let Choose = '';
    /* 用于单选 默认已选数据 默认输入value值*/
    export let isNUll = false;
    /* 单选情况是否显示空选项 */

    /* 用于多选  为选中的选项数组，可以传入数组，表示已选【这里的数据的值必须包含在ArrayList中】 {['1','2','3']}  */

    onMount(() => {
        if (MulChoice) {
            gobackfun();
        }
        if (Size === 'medium') {
            if(!Modify) {
                style = 'width:180px';
            }
        } else if (Size === 'large') {
            if(!Modify) {
                style = 'width:210px';
            }
        }
    });

    let arrList = ArrayList ? ArrayList : [];
    let MulChoiceMark = MulChoice ? "two" : "one";
    let style = Modify ? Modify : "width:150px";

    let visableList = false;
    let selectValue = [];
    let dropListHigh;
    let upOrDown = false;
    /* 获取高度 */
    let winH = document.body.clientHeight || document.documentElement.clientHeight;
    /* 多选处理回显 */
    function gobackfun() {
        let arrindex = [];
        selectValue = [];
        for(let v of Choose) {
            for (let k = 0 ; k < ArrayList.length; k ++) {
                ArrayList[k].select = false;
                if (v === ArrayList[k].value) {
                    arrindex.push(k);
                }
            }
        }
        arrindex = arrindex;
        for (let m of arrindex) {
            ArrayList[m].select = true;
            selectValue.push(ArrayList[m]);
        }
        selectValue = selectValue;
        ArrayList = ArrayList;
        if (Noenable) {
            selectValue = [];
        }

    }
    function changeSelect() {
        dispatch('changSelect', Choose);
    }
    function handleMousemove(event) {
        dropListHigh = event.clientY;
        dropListHigh = dropListHigh;
    }
    function click(event) {
        if (Noenable) {
            return;
        }
        winH = winH;
        if (dropListHigh + 136 > winH) {
            upOrDown = true;
        }else {
            upOrDown = false;
        }
        visableList = !visableList;
        changeList();
    }
    function changeList() {
        let index = [];
        for(let v = 0; v < arrList.length; v++) {
            if (selectValue.length < 1) {
                arrList[v].select = false;
            }else {
                for(let j = 0 ; j < selectValue.length; j++) {
                    if (selectValue[j].value === arrList[v].value) {
                        index.push(v);
                        index = index;
                    }
                }
            }
        }
        for (let v of index) {
            arrList[v].select = true;
            arrList = arrList;
        }
        arrList = arrList;
    }
    function selectclick() {
        click();
    }
    function clear(value) {
        visableList = false;
        for(let v of arrList) {
            if (v.value === value.value){
                v.select = false;
            }
        }
        arrList = arrList;
        selectValue.splice(0,1);
        selectValue = selectValue;
        let patchArr =[];
        for(let v of selectValue) {
            patchArr.push(v.value);
            patchArr = patchArr;
        }
        dispatch('changSelect', patchArr);
    }
    function lickick(index,value) {
        selectValue = [];
        arrList[index].select = !arrList[index].select;
        arrList = arrList;
        for (let v of arrList){
            if (v.select) {
                selectValue.push(v);
                selectValue = selectValue;
            }
        }
        let patchArr =[];
        for(let v of selectValue) {
            patchArr.push(v.value);
            patchArr = patchArr;
        }
        dispatch('changSelect', patchArr);

    }
    // 点击空白处收缩下拉框
    function OutKeydown(e) {
        visableList = false;
    }

</script>

<!-- 单一下拉框 -->
{#if MulChoiceMark === "one"}
    <div class="dropdown-one">
        <div class="field">
            <div class="control">
                <div style="width:100%" class:is-medium={Size === 'medium'} class:is-large={Size === 'large'} class="select is-info">
                <select
                    style={style}
                    disabled = {Noenable ? true : false}
                    bind:value={Choose} on:change="{changeSelect}">
                    {#if isNUll}
                        <option value="null"></option>
                    {/if}
                    {#each arrList as k }
                            <option value={k.value}>{k.label}</option>
                    {/each}
                </select>
                </div>
            </div>
        </div>
    </div>
{/if}
<!-- 下拉多选框 -->
{#if MulChoiceMark === "two"}
<div class="dropdown-more" style={style} >
    <div class="field">
        <div class:minwidthmedium={Size === 'medium'} class:minwidthlarge={Size === 'large'} class="control minwidth"> <!-- is-medium is-large  -->
            {#if (Size !== 'medium' && Size !== 'large')}
                <input readonly="readonly"
                style={style}
                disabled = {Noenable ? true : false}
                class:is-medium={Size === 'medium'} class:is-large={Size === 'large'}
                on:mousemove={handleMousemove}
                on:click|stopPropagation= {click} class="input cursor is-info" type="text" placeholder="">
            {/if}
            {#if (Size === 'medium')}
                <input readonly="readonly"
                style={style}
                disabled = {Noenable ? true : false}
                class:is-medium={Size === 'medium'} class:is-large={Size === 'large'}
                on:mousemove={handleMousemove}
                on:click|stopPropagation= {click} class="input minwidthmedium is-info" type="text" placeholder="">
            {/if}
            {#if (Size === 'large')}
                <input readonly="readonly"
                style={style}
                disabled = {Noenable ? true : false}
                class:is-medium={Size === 'medium'} class:is-large={Size === 'large'}
                on:mousemove={handleMousemove}
                on:click|stopPropagation= {click} class="input minwidthlarge is-info" type="text" placeholder="">
            {/if}

            <!-- 下拉框数据 -->
            {#if visableList}
                {#if !upOrDown}
                    <div style={style} class="smex-dropdate-list">
                        <ur class="smex-ur">
                            {#each arrList as a,index}
                                <li class:smex-selected-world="{a.select}" on:click|stopPropagation={()=>lickick(index,a)} class="smex-li">
                                    <span class="smex-li-world">{a.label}</span>
                                    {#if a.select}
                                        <span class="smex-true">√</span>
                                    {/if}
                                </li>
                            {/each}
                        </ur>
                    </div>
                {:else}
                    <div style={style} class="smex-dropdate-list down">
                        <ur class="smex-ur">
                            {#each arrList as a,index}
                                <li class:smex-selected-world="{a.select}" on:click|stopPropagation={()=>lickick(index,a)} class="smex-li">
                                    <span class="smex-li-world">{a.label}</span>
                                    {#if a.select}
                                        <span class="smex-true">√</span>
                                    {/if}
                                </li>
                            {/each}
                        </ur>
                    </div>
                {/if}
            {/if}
        <!-- 下拉框按钮 -->
            {#if Size === "medium"}
               <span on:click|stopPropagation={click} class="dropdown downmedium"></span>
            {:else}
                {#if Size === "large"}
                    <span on:click|stopPropagation={click} class="dropdown downlarge"></span>
                {:else}
                    <span on:click|stopPropagation={click} class="dropdown"></span>
                {/if}
            {/if}
            <!-- 显示点击所选的第一个 -->
            {#if Size === "medium"}
                {#if selectValue.length >= 1}
                    <div  class="dropdwon-select-first firstmedium">
                        <span on:click|stopPropagation={selectclick} class="smex-world-long" title={selectValue[0].label}>{selectValue[0].label}</span>
                        <span on:click|stopPropagation={()=>clear(selectValue[0])} class="smex-drop-hover">x</span>
                    </div>
                {/if}
            {:else}
                {#if Size === "large"}
                    {#if selectValue.length >= 1}
                        <div  class="dropdwon-select-first firstlarge">
                            <span on:click|stopPropagation={selectclick} class="smex-world-long longlarge" title={selectValue[0].label}>{selectValue[0].label}</span>
                            <span on:click|stopPropagation={()=>clear(selectValue[0])} class="smex-drop-hover hovelarge">x</span>
                        </div>
                    {/if}
                {:else}
                   {#if selectValue.length >= 1}
                        <div  class="dropdwon-select-first">
                            <span on:click|stopPropagation={selectclick} class="smex-world-long" title={selectValue[0].label}>{selectValue[0].label}</span>
                            <span on:click|stopPropagation={()=>clear(selectValue[0])} class="smex-drop-hover">x</span>
                        </div>
                    {/if}
                {/if}
            {/if}
            {#if Size === "medium"}
                {#if selectValue.length >= 1}
                    <div  on:click|stopPropagation={click}  class="dropdwon-select-number medium">
                        +{selectValue.length}
                    </div>
                {/if}
            {:else}
                {#if Size === "large"}
                    {#if selectValue.length >= 1}
                    <div  on:click|stopPropagation={click}  class="dropdwon-select-number large">
                        +{selectValue.length}
                    </div>
                    {/if}
                {:else}
                    {#if selectValue.length >= 1}
                    <div  on:click|stopPropagation={click}  class="dropdwon-select-number">
                        +{selectValue.length}
                    </div>
                    {/if}
                {/if}
            {/if}


        </div>
    </div>

</div>
{/if}
<svelte:window on:click={OutKeydown}/>
<style lang="scss">
    ::-webkit-scrollbar{
        display: block;
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px 2px #3298dc;
        background: #3298dc;
        border-radius: 10px;
    }
    .smex-drop {
        position: absolute;
        text-align: center;
        color: #c0c4cc;
        transition: all .3s;
        pointer-events: none;
        width: 16px;
        height: 16px;
        line-height: 11px;
        right: 6px;
        border-radius: 100%;
        top: 8px;
        border: 1px solid #c0c4cc;
    }
    .smex-drop-inner {
        pointer-events: all;
        cursor: pointer;
    }
    .cursor {
        cursor: pointer;
        min-width: 150px;
    }
    .dropdown {
        content: "";
        width: 7px;
        height: 7px;
        position: absolute;
        top: 11px;
        right: 9px;
        transform: rotate(-315deg);
        border-right: 2px solid rgb(0, 153, 204);
        border-bottom: 2px solid rgb(0, 153, 204);
        cursor: pointer;
    }
    /* 多选按钮 */
    .dropdwon-select-first {
        position: relative;
        height: 24px;
        top: -27px;
        left: 3px;
        border-radius: 3px;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        color: #909399;
        max-width: 90px;
        line-height: 22px;
        padding-left: 3px;
        z-index: 10;
        text-align: center;
        cursor: pointer;
    }
    .smex-drop-hover {
        position: absolute;
        text-align: center;
        transition: all .3s;
        right: 6px;
        border-radius: 100%;
        border: 1px solid #c0c4cc;
        background-color: #c0c4cc;
        color: #909399;
        width: 13px;
        height: 13px;
        line-height: 7px;
        top: 6px;
        cursor: pointer;
        z-index: 999999;
    }
    .smex-drop-hover:hover{
        color: #fff;
        background-color: #909399;
        border: 1px solid #909399;
    }
    .dropdwon-select-number {
        position: relative;
        height: 24px;
        top: -51px;
        left: 99px;
        border-radius: 3px;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        color: #909399;
        max-width: 25px;
        line-height: 22px;
        padding-left: 3px;
        z-index: 10;
        text-align: center;
        padding: 1px 1px 1px 1px;
        cursor: pointer;
    }
    .smex-world-long {
        display: block;
        width: 69px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .smex-dropdate-list {
        width: 100%;
        max-height: 150px;
        transform-origin: center top;
        position: absolute;
        border: 1px solid #2196F3;
        overflow: scroll;
        border-radius: 3px;
        background: #fff;
        z-index: 999;
    }
    .smex-ur {
        list-style: none;
        padding: 6px 0;
        margin: 0;
        box-sizing: border-box;
    }
    .smex-li {
        font-size: 12px;
        padding: 0 10px;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #606266;
        height: 33px;
        line-height: 34px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .smex-li:hover {
        background-color:#03A9F4;
        color: white;
    }
    .smex-true {
        float: right;
        font-size: 12px;
        font-weight: 700;
        color: #03A9F4;
    }
    .smex-li-world {
        width: 105px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }
    .smex-selected-world {
        /*  background-color:#03A9F4; */
        color: #03A9F4;
    }
    .medium {
        top: -54px;
        max-width: 30px;
        left: 119px;
    }
    .large {
        height: 32px;
        top: -70px;
        left: 152px;
        max-width: 30px;
        line-height: 29px;
    }
    .firstmedium {
        top: -30px;
        left: 13px;
        max-width: 98px;
    }
    .firstlarge {
        height: 32px;
        top: -38px;
        left: 13px;
        max-width: 126px;
        line-height: 32px;
    }
    .longlarge {
        width: 104px;
    }
    .hovelarge{
        width: 13px;
        height: 13px;
        line-height: 8px;
        top: 10px;
    }
    .downmedium {
        top:15px;
    }
    .downlarge{
        top:19px;
    }
    // .dropdown-more {
    //     position: absolute;
    // }
    // .dropdown-one {
    //     position: absolute;
    // }
    .minwidth{
        min-width: 150px;
        height: 30px;
    }
    .minwidthmedium {
        min-width: 180px;
        cursor: pointer;
        height: 37.5px;
    }
    .minwidthlarge {
        min-width: 210px;
        cursor: pointer;
        height: 45px;
    }
    .down {
        bottom: 30px;
    }
</style>



