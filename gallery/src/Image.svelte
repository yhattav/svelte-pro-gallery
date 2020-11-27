<script>
import {getRandomColor} from './Utils.js'
import {GALLERY_CONSTS} from 'pro-gallery-lib'
import Hover from './Hover.svelte';
import { getContext } from 'svelte';
const { getStyles } = getContext('galleryContext');
const { onHover } = getContext('eventsListener');
const { onClick } = getContext('eventsListener');
const styles = getStyles();


export let item, index;
// $:console.log(item.createUrl(
//             GALLERY_CONSTS.urlSizes.RESIZED,
// 			GALLERY_CONSTS.urlTypes.HIGH_RES 
// 			));
// item.createUrl(
//             GALLERY_CONSTS.urlSizes.PRELOAD,
//             GALLERY_CONSTS.urlTypes.LOW_RES
// 		  );
// 		        const src = createUrl(
//         GALLERY_CONSTS.urlSizes.RESIZED,
//         isSEOMode()
//           ? GALLERY_CONSTS.urlTypes.SEO
//           : GALLERY_CONSTS.urlTypes.HIGH_RES
//       );

</script>

<div id='{'image-item-'+ index}' class='image-item' >
	<!-- <div  class="item-content" style="background-color: {getRandomColor()}"> -->
	<img src={item.createUrl(
            GALLERY_CONSTS.urlSizes.RESIZED,
            GALLERY_CONSTS.urlTypes.HIGH_RES
        )}>
</div>

<style>

	.image-item {
		width: 100%;
		height: 100%;
	}
	
	img {
		width:100%;
		height: 100%;
	}
</style>
