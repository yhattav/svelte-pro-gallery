<script>
import { getContext } from 'svelte';
const { getStyles } = getContext('galleryContext');
const styles = getStyles();
    export let item = {};
    $:console.log(styles);
    $:title = item.dto.metadata.title;
    $:description = item.dto.metadata.description;
</script>

<div class="info-element" id="info-element{item.idx}">
{#if title && styles.allowTitle}
    <p class="title item-text">{title}</p>
{/if}
{#if description && styles.allowDescription}
    <p class="description item-text">{description}</p>
{/if}
</div>

<style>
.info-element {
    padding: 15px;
}
.item-text {
    color: var(--itemDescriptionFontColor);
}
</style>