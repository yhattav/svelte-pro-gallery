<script>
    import Item from './Item.svelte';
    import {getColorSchemeStyles} from './colorSchemeHelper.js';
import { setContext } from 'svelte';

export let container = {}, styles = {}, items = [], structure={};
setContext('galleryContext', {
	getStyles: () => styles
});
let galleryClasses = 'svelte_pg_gallery';
let colorSchemeStyleString 
$: colorSchemeStyleString = getColorSchemeStyles(styles);
// $:console.log('>>>>', structure);
</script>

<div class={galleryClasses} style={colorSchemeStyleString}> 
	{#each (structure.items || [])  as item, index}
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
