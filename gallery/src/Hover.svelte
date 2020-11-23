<script>
    import Info from './Info.svelte';
    export let visible=false, item;
    import { getContext } from 'svelte';
    const { getStyles } = getContext('galleryContext');
    const styles = getStyles();
    let opacity = styles.hoverOpacity || 0.6;
</script>

<div class="hover-container">
<Info {item}/>
</div>

<style>
    .hover-container {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0;
        background-color: var(--itemOpacity);
    } :hover {
        opacity: 1;
    }
</style>