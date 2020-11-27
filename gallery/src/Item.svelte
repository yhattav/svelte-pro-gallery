<script>
import {getRandomColor} from './Utils.js'
import Hover from './Hover.svelte';
import Image from './Image.svelte';
import { getContext } from 'svelte';
const { getStyles } = getContext('galleryContext');
const { onHover } = getContext('eventsListener');
const { onClick } = getContext('eventsListener');
const styles = getStyles();


export let item, index;
let offset, width, height, dto, type;
$: offset = item.offset;
$: width = item.width;
$: height = item.height;
$: dto = item.dto;
$: type = item.type;

function onItemClick() {
	onClick(item, index);
}
function onItemHover() {
	onHover(item, index);
}
let hoverVisible = false;
</script>

<div id='{'item-container-'+ index}' class='item-container' style="top: {offset.top}px; left: {offset.left}px; width: {width}px; height: {height}px;" on:click={onItemClick} on:mouseenter={onItemHover}>
	<div  class="item-content" style="background-color: {getRandomColor()}">
		<Image {item} {index}/>
	</div>
	<Hover visible={hoverVisible} {item}/>
</div>

<style>
	.item-container {
		position: absolute;
	}

	.item-content {
		width: 100%;
		height: 100%;
	}
</style>
