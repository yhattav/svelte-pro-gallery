    const colorSchemeStyles = [
        'itemDescriptionFontColor',
        'descriptionColorExpand',
        'itemBorderColor',
        'itemDescriptionFontColorSlideshow',
        'itemFontColor',
        'itemFontColorSlideshow',
        'itemOpacity',
        'itemShadowOpacityAndColor',
        'loadMoreButtonBorderColor',
        'loadMoreButtonColor',
        'loadMoreButtonFontColor',
        'oneColorAnimationColor',
        'textBoxBorderColor',
        'textBoxFillColor',
        'titleColorExpand',
        'titleFontExpand',
        'arrowsColor',
        'bgColorExpand',
        'actionsColorExpand',
        //fonts
        'descriptionFontExpand',
        'itemDescriptionFont',
        'itemDescriptionFontSlideshow',
        'itemFont',
        'itemFontSlideshow',
        'loadMoreButtonFont',
        'titleFontExpand',
    ];

    export function getColorSchemeStyles(styles) {
        function createColorStyles(color){
            return styles[color] ? `--${color}: ${styles[color].value}; ` : '';
        }
        return colorSchemeStyles.map(createColorStyles).join('');
    };