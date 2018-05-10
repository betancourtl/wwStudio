import makeDynamicStyles from '../dynamicStyles';

export const prefix = 'FONT_FAMILY_';
export const FONT_COLOR_GEORGIA = `${prefix}georgia`;
export const FONT_COLOR_TIMES = `${prefix}times`;
export const FONT_COLOR_SERIF = `${prefix}serif`;

export const styles = [
  FONT_COLOR_GEORGIA,
  FONT_COLOR_TIMES,
  FONT_COLOR_SERIF,
];

const color = makeDynamicStyles(prefix, 'fontFamily');

export const toggleFontFamily = color.toggleDynamicStyles;
export const currentFontFamily = color.currentStyle;
export const fontFamilyFn = color.StyleFn;
