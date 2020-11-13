<script>
import {getRandomColor} from './Utils.js'
export let offset, width, height, dto, type, index;
</script>


<div class={'item: '+ index} style="top: {offset.top}px; left: {offset.left}px; width: {width}px; height: {height}px; background-color: {getRandomColor()}">
<!-- <img src={dto.url}> -->
</div>

<style>
	div {
		position: absolute;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
