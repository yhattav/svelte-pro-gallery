<script>
  import Moveable from "svelte-moveable";
  let target, scroller;
  import {testImages} from './images.js'
  import {BlueprintsManager, viewModeWrapper, utils } from 'pro-gallery-lib'
  import {styles} from './mockStyles.js'
  import Gallery from '../gallery/Gallery.svelte';
  import {mixAndSlice, debounce} from '../utils.js'
  import { getContext } from 'svelte';
  const { handleDimensionsChange } = getContext('blueprintTriggers');

    let frame = {
        translate: [0,0],
    };
    let containerWidth = 500, containerHeight = 500, containerTop = 150;
    export let blueprint, resizeMediaUrl;
    // $:console.log('>>>>>>>>', containerWidth,containerHeight)
    $: debouncedSetContainer(containerWidth, containerHeight, containerTop);
    // $:console.log('<<<<', containerTop)
    // $:console.log('>>>>>blueprint changes in board', blueprint);
    // $:console.log('<<<<<', containerWidth, containerHeight, container)

    const setContainer = (width, height, scrollBase) =>{
      // console.log('Calling dimensions changed');
      handleDimensionsChange( {
              width: containerWidth,
              height: containerHeight,
              scrollBase: containerTop,
          });
    }

    const debouncedSetContainer = debounce(setContainer, 50);     
    

  
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

<div class="target" bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} bind:this={target}>
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
