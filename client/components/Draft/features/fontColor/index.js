import makeDynamicStyles from '../dynamicStyles';

export const prefix = 'FONT_COLOR_';

const color = makeDynamicStyles(prefix, 'color');

export const toggleColor = color.toggleDynamicStyles;
export const currentColor = color.currentStyle;
export const colorStyleFn = color.StyleFn;
