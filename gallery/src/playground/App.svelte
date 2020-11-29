<script>
   import Moveable from "svelte-moveable";
   import { resizeMediaUrl } from './itemResizer';
    let target, scroller;
    import {testImages} from './images.js'
    import {BlueprintsManager, viewModeWrapper, utils } from 'pro-gallery-lib'
    import {styles} from './mockStyles.js'
    import GalleryBoard from './GalleryBoard.svelte';
    import SideBar from './SideBar.svelte';
    import SideBarButton from './SideBarButton.svelte';
    import {mixAndSlice, debounce} from '../utils.js'
    import { setContext } from 'svelte';

    setContext('eventsListener', {
      onClick: (item, index) => console.log('Item Clicked', index, item),
      onHover: (item, index) => console.log('Item Hovered', index, item),
      onShareClicked: (item, index) => console.log('Item Share Clicked', index, item),
    });
    setContext('blueprintTriggers', {
      handleDimensionsChange: (dimensions) => { //console.log('dimensions changed', dimensions);
      setContainer({...container, ...dimensions});
      },
      handleItemsChanged: (items) => console.log('Items changed', items),
      handleStylesChanged: (styles) => console.log('Styles changed', styles),
    });

    export let viewMode = 'PREVIEW', formFactor = 'mobile' ;

    let items = mixAndSlice(testImages,10);

    init();
    const blueprintsManager = new BlueprintsManager({id: 'svelte-pg'});
    let container, blueprint;
    container = {
        width: 980,
        height: 500,
        scrollBase: 150,
    }
    // $:console.log('>>>>>>>>', windowWidth,windowHeight)
    //$: (windowWidth,windowHeight)=>{debounce(console.log('>>>>>>>>!!!!!!!!!!!!!!!!!!!!!!!!!!', windowWidth,windowHeight),500)};
    $:params = {container, items, styles};
    $:getBlueprint(params);
    // $:console.log('<<<<', containerTop)
    $:console.log('>>>>>blueprint changes', blueprint);
    // $:console.log('<<<<<', windowWidth, windowHeight, container)

    const setContainer = (newContainer) =>{
      // console.log('Setting container')
      container = newContainer;
    }
    // const debouncedSetContainer =   debounce(setContainer, 50);     

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

</script>

<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/slate/bootstrap.min.css'>

<div id="playground-container" class="playground-container container-fluid">
  <div class="row playground-row">

    <div class="col sidebar-column no-padding">
  <SideBar/>
    </div>
    <div class="col gallery-board-column no-padding">
  <GalleryBoard {blueprint} {resizeMediaUrl}/>
    </div>
  </div>

</div>

<style>
  html, body {
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
}

div {
  border: 1px solid #333;
}
.playground-container {
  height: 100%;
}
.playground-row {
  height: 100%;
}
.sidebar-column {
  max-width: 200px;
  /* height: 1vh; */
}
.no-padding {
  padding: 0;
}
</style>
