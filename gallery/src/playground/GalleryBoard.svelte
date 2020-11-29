<script>
  import Moveable from "svelte-moveable";
  import Guides from "svelte-guides";
  import { onMount, tick } from "svelte";
  import { Frame } from "scenejs";
  import {BlueprintsManager, viewModeWrapper, utils } from 'pro-gallery-lib'
  import Gallery from '../gallery/Gallery.svelte';
  import {debounce} from '../utils.js'
  import { getContext } from 'svelte';
  const { handleDimensionsChange } = getContext('blueprintTriggers');

    let frame = {
        translate: [0,0],
    };
    let containerWidth = 500, containerHeight = 500, containerTop = 150;
    export let blueprint, resizeMediaUrl;
    $:console.log('>>>>>>>>', containerWidth,containerHeight)
    $: debouncedSetContainer(containerWidth, containerHeight, containerTop);
    // $:console.log('<<<<', containerTop)
    // $:console.log('>>>>>blueprint changes in board', blueprint);
    // $:console.log('<<<<<', containerWidth, containerHeight, container);

    const setContainer = (width, height, scrollBase) =>{
      console.log('Calling dimensions changed');
      handleDimensionsChange( {
              width: containerWidth,
              height: containerHeight,
              scrollBase: containerTop,
          });
    }

    const debouncedSetContainer = debounce(setContainer, 50);     
    
  const frameMap = new Map();
  let targets = [];
  let moveable;
  let scroller;
  let guides1;
  let guides2;
  let horizontalGuidelines;
  let verticalGuidelines;
  let throttleRotate = 0;
  let target;
  let boardWidth;
  let boardHeight;
  let onWindowResize = () => {};
  $:onWindowResize(boardWidth, boardHeight);

  // function newFrame(el) {
  //   const frame = new Frame({
  //     transform: {
  //       translateX: "0px",
  //       translateY: "0px",
  //       rotate: "0deg",
  //       scaleX: 1,
  //       scaleY: 1
  //     }
  //   });

  //   frameMap.set(el, frame);

  //   return frame;
  // }
  // function getFrame(target) {
  //   return frameMap.get(target) || newFrame(target);
  // }
  // function onRender({ target }) {
  //   target.style.cssText += getFrame(target).toCSS();
  // }
  // function onDragStart({ target, set }) {
  //   const frame = getFrame(target);

  //   set([
  //     parseFloat(frame.get("transform", "translateX")),
  //     parseFloat(frame.get("transform", "translateY"))
  //   ]);
  // }
  // function onDrag({ target, beforeTranslate }) {
  //   const frame = getFrame(target);

  //   frame.set("transform", "translateX", `${beforeTranslate[0]}px`);
  //   frame.set("transform", "translateY", `${beforeTranslate[1]}px`);
  // }

  //   const onResizeStart = ({ target, setOrigin, dragStart }) => {
  //       const frame = getFrame(target);
  //       console.log(frame)
  //       setOrigin(["%", "%"]);
  //       dragStart && dragStart.set([frame.properties.transform.translateX, frame.properties.transform.translateY]);
  //   }
  //   const onResize = ({ target, width, height, drag }) => {
  //         const frame = getFrame(target);
  //       const beforeTranslate = drag.beforeTranslate;
  //      frame.set("transform", "translateX", `${beforeTranslate[0]}px`);
  //   frame.set("transform", "translateY", `${beforeTranslate[1]}px`); 
  //       // frame.translate = beforeTranslate;
  //       target.style.width = `${width}px`;
  //       target.style.height = `${height}px`;
  //       target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
  //   }

  // function onRotateStart({ target, set, dragStart }) {
  //   const frame = getFrame(target);
  //   set(parseFloat(frame.get("transform", "rotate")));

  //   dragStart && onDragStart(dragStart);
  // }
  // function onRotate({ target, beforeRotate, drag }) {
  //   const frame = getFrame(target);

  //   frame.set("transform", "rotate", `${beforeRotate}deg`);

  //   drag && onDrag(drag);
  // }

  function onWindowResizeImp() {
    guides1.resize();
    guides2.resize();
  }
  function setGuides() {
    horizontalGuidelines = [
      ...guides1.getGuides(),
      (boardHeight - 30) / 2
    ];
    verticalGuidelines = [...guides2.getGuides(), (boardWidth - 30) / 2];
  }

  onMount(() => {
    const left = (boardWidth - 30) / 2 - 100;
    const top = (Math.max(boardHeight, 700) - 30) / 2 - 75 - 200;
    setGuides();
    console.log(left,top)
    target.style.cssText += `left: ${left - 200}px;top: ${top}px`;
    requestAnimationFrame(() => {
      targets = [document.querySelector(".target")];

      console.log(targets);
      onWindowResize = onWindowResizeImp;
      onWindowResize();
    });
  })
</script>

<style>


  :global(html),
  :global(body) {
    /* font-family: "Open Sans", sans-serif;
    position: relative;
    margin: 0;
    padding: 0;
    height: 100%;
    color: #333;
    letter-spacing: 1px;
    background: #f5f5f5;
    font-weight: 300; */
    touch-action: manipulation;
  }

  :global(.moveable) {
    z-index: 10;
  }
  .page {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 700px;
  }

  .scroller {
    position: absolute;
    left: 30px;
    top: 30px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Likely future */
    overflow: hidden;
;
  }
  .scroller:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.05;
        background-image: url("../assets/pro-gallery-logo.png");
    background-repeat: repeat;
      -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);
    background-size: 50px;
}

.target {
      z-index: 20;

    position: absolute;
    width: 980px;
    height: 500px;
    top: 150px;
    left: 100px;
    border: 1px solid #333;
    box-sizing: border-box;
}

  .ruler {
    position: absolute;
    top: 0;
    left: 0;
  }
  .ruler.horizontal {
    left: 0px;
    width: 100%;
    height: 30px;
  }
  .ruler.vertical {
    top: 0px;
    width: 30px;
    height: 100%;
  }
  .box {
    position: relative;
    width: 30px;
    height: 30px;
    background: #444;
    box-sizing: border-box;
    z-index: 21;
    z-index: 1;
  }
  .box:before,
  .box:after {
    position: absolute;
    content: "";
    background: #777;
  }
  .box:before {
    width: 1px;
    height: 100%;
    left: 100%;
  }
  .box:after {
    height: 1px;
    width: 100%;
    top: 100%;
  }
</style>

<!-- <svelte:window on:resize={onWindowResize} /> -->
<div class="page" bind:clientWidth={boardWidth} bind:clientHeight={boardHeight} on:resize={onWindowResize}>
  <div class="box" />
  <div class="ruler horizontal">
    <Guides
      bind:this={guides1}
      type="horizontal"
      backgroundColor="#444"
      rulerStyle={{ left: '30px', width: 'calc(100% - 30px)', height: '30px' }}
      {setGuides} />
  </div>
  <div class="ruler vertical">
    <Guides
      bind:this={guides2}
      type="vertical"
      backgroundColor="#444"
      rulerStyle={{ top: '30px', height: 'calc(100% - 30px)', width: '30px' }}
      {setGuides} />
  </div>
  <div class="scroller" bind:this={scroller}>
    {#if scroller}
    <Moveable
      container={scroller}
      className="moveable"
      bind:this={moveable}
      {horizontalGuidelines}
      {verticalGuidelines}
      target={target}
      draggable={true}
      throttleDrag={0}
      zoom={1}
      origin={false}
      padding={{"left":0,"top":0,"right":0,"bottom":0}}

      on:dragStart={({ detail: { set } }) => {
          set(frame.translate);
      }}
      on:drag={({ detail: { target, beforeTranslate } }) => {
          frame.translate = beforeTranslate;
      }}
      on:render={({ detail: { target } }) => {
          const { translate } = frame;
          target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)`;
      }}

      resizable={true}
      keepRatio={false}
      throttleResize={0}
      renderDirections={["nw","n","ne","w","e","sw","s","se"]}
      edge={true}
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

      />
    {/if}
    <div class="target" bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} bind:this={target}>  <Gallery {...blueprint} {resizeMediaUrl}/></div>
    <!-- <div class="target" bind:clientWidth={containerWidth} bind:clientHeight={containerHeight} bind:this={target}>MOVABLE</div> -->
  </div>
</div>
