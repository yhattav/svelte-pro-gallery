<script>
   import Moveable from "svelte-moveable";
   import { resizeMediaUrl } from './itemResizer';
    let target, scroller;
    import {testImages} from './images.js'
    import {BlueprintsManager, viewModeWrapper, utils } from 'pro-gallery-lib'
    import {styles} from './mockStyles.js'
    import Gallery from './Gallery.svelte';
    import {mixAndSlice, debounce} from './Utils.js'
    import { setContext } from 'svelte';

    setContext('eventsListener', {
      onClick: (item, index) => console.log('Item Clicked', index, item),
      onHover: (item, index) => console.log('Item Hovered', index, item),
      onShareClicked: (item, index) => console.log('Item Share Clicked', index, item),
    });
    let frame = {
        translate: [0,0],
    };

    export let viewMode = 'PREVIEW', formFactor = 'mobile' ;
    let items = mixAndSlice(testImages,10);
    init();
    const blueprintsManager = new BlueprintsManager({id: 'svelte-pg'});
    let container, blueprint, windowWidth = 980, windowHeight = 500,containerTop = 100;
    container = {
        width: windowWidth,
        height: windowHeight,
        scrollBase: containerTop,
    }
    // $:console.log('>>>>>>>>', windowWidth,windowHeight)
    //$: (windowWidth,windowHeight)=>{debounce(console.log('>>>>>>>>!!!!!!!!!!!!!!!!!!!!!!!!!!', windowWidth,windowHeight),500)};
    $: debouncedSetContainer(windowWidth,windowHeight,containerTop);
    $:params = {container, items, styles};
    $:getBlueprint(params);
    // $:console.log('<<<<', containerTop)
    // $:console.log('>>>>>blueprint changes', blueprint);
    // $:console.log('<<<<<', windowWidth, windowHeight, container)

    const setContainer = (width, height, scrollBase) =>{
      container = {
              width: windowWidth,
              height: windowHeight,
              scrollBase: containerTop,
          };
    }
    const debouncedSetContainer =   debounce(setContainer, 50);     

    async function getBlueprint(params) {
        blueprint = await blueprintsManager.createBlueprint(params);
    }
      function init() {
    if (typeof viewMode !== 'undefined') {
      viewModeWrapper.setViewMode(viewMode);
    }
    if (typeof formFactor !== 'undefined') {
      viewModeWrapper.setFormFactor(formFactor);
    }
  }
  function onDragStart() {
    return;
  }
  function onDrag() {
    return;
  }
  function onDragEnd() {
    return;
  }
</script>

<div class="target" bind:clientWidth={windowWidth} bind:clientHeight={windowHeight} bind:this={target}>
  <Gallery {...blueprint} {resizeMediaUrl}/>
</div>
<Moveable
    target={target}
    resizable={true}
    keepRatio={false}
    throttleResize={0}
    renderDirections={["nw","n","ne","w","e","sw","s","se"]}
    edge={false}
    zoom={1}
    origin={true}
    padding={{"left":0,"top":0,"right":0,"bottom":0}}
    on:resizeStart={({ detail: { setOrigin, dragStart } }) => {
        setOrigin(["%", "%"]);
        dragStart && dragStart.set(frame.translate);
    }}
    on:resize={({ detail: { target, width, height, drag } }) => {
        const beforeTranslate = drag.beforeTranslate;
    
        frame.translate = beforeTranslate;
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}
      draggable={true}
  throttleDrag={0}
  on:dragStart={({ detail }) => onDragStart(detail)}
  on:drag={({ detail }) => onDrag(detail)}
  on:dragEnd={({ detail }) => onDragEnd(detail)}
/>

<style>

  html, body {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
}

.target {
    position: absolute;
    width: 980px;
    height: 500px;
    top: 150px;
    left: 100px;
    border: 1px solid #333;
    box-sizing: border-box;
}
</style>
