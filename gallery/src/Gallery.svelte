<script>
    import Item from './Item.svelte';

export let container, styles, items, structure={};
let galleryClasses = 'svelte_pg_gallery';
$:console.log('>>>>', structure);
</script>


<div class={galleryClasses}>Gallery 
	{#each (structure.items || [])  as item, index}
 <Item {...item} {index}></Item>
 {/each}
 </div>
<style>
	div {
		position: relative;
	}
</style>
