<script>
    import Item from './Item.svelte';
	import {getColorSchemeStyles} from './colorSchemeHelper.js';
	import {ItemsHelper} from 'pro-gallery-lib';
	import { setContext } from 'svelte';

	export let container = {}, styles = {}, items = [], structure, resizeMediaUrl=()=>{};

	setContext('galleryContext', {
		getStyles: () => styles
	});

	$: galleryStructure = getGalleryStructure(structure, styles);
	$: colorSchemeStyleString = getColorSchemeStyles(styles);
	const getGalleryStructure = (structure, styles) => {
		if (structure) {
			return ItemsHelper.convertToGalleryItems(structure, {
			thumbnailSize: styles.thumbnailSize,
			sharpParams: styles.sharpParams,
			resizeMediaUrl: resizeMediaUrl,
			});
		} else {
			return {};
		}
	}
	let galleryClasses = 'svelte_pg_gallery';
	let colorSchemeStyleString 
// $:console.log('>>>>', structure);
</script>

<div class={galleryClasses} style={colorSchemeStyleString}> 
	{#each (galleryStructure.galleryItems || [])  as item, index}
 <Item {item} {index}></Item>
 {/each}
 </div>
<style>
	div {
		height: 100%;
		width: 100%;
		overflow:auto; 
		position: relative;
	}
</style>
