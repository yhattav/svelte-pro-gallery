<script>
    import {testImages} from './images.js'
    import {BlueprintsManager, viewModeWrapper, utils } from 'pro-gallery-lib'
    import {styles} from './mockStyles.js'
    import Gallery from './Gallery.svelte';

	export let viewMode = 'PREVIEW', formFactor = 'mobile', name;
    init();
    const blueprintsManager = new BlueprintsManager({id: 'svelte-pg'});
    let container, blueprint, windowWidth = 1920, windowHeight = 1080;
    $:container = {
        width: windowWidth,
        height: windowHeight,
        scrollBase: 100,
    }
    $:params = {container, items: testImages.slice(0,50), styles};
    $:getBlueprint(params);
    $:console.log('>>>>>blueprint changes', blueprint);
    $:console.log(windowWidth, windowHeight)
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
<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight}/>

<main>
<Gallery {...blueprint}/>
	<h1>Hello {name}!</h1>
	<p>I love coco  <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
