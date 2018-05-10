import makeDynamicStyles from '../dynamicStyles';

export const prefix = 'FONT_SIZE_';
export const FONT_SIZE_8PX = `${prefix}8px`;
export const FONT_SIZE_9PX = `${prefix}9px`;
export const FONT_SIZE_10PX = `${prefix}10px`;
export const FONT_SIZE_12PX = `${prefix}12px`;
export const FONT_SIZE_14PX = `${prefix}14px`;
export const FONT_SIZE_16PX = `${prefix}16px`;
export const FONT_SIZE_18PX = `${prefix}18px`;
export const FONT_SIZE_20PX = `${prefix}20px`;
export const FONT_SIZE_22PX = `${prefix}22px`;
export const FONT_SIZE_24PX = `${prefix}24px`;
export const FONT_SIZE_36PX = `${prefix}36px`;
export const FONT_SIZE_48PX = `${prefix}48px`;
export const FONT_SIZE_72PX = `${prefix}72px`;
export const fontSizes = [
  FONT_SIZE_8PX,
  FONT_SIZE_9PX,
  FONT_SIZE_10PX,
  FONT_SIZE_12PX,
  FONT_SIZE_14PX,
  FONT_SIZE_16PX,
  FONT_SIZE_18PX,
  FONT_SIZE_20PX,
  FONT_SIZE_22PX,
  FONT_SIZE_24PX,
  FONT_SIZE_36PX,
  FONT_SIZE_48PX,
  FONT_SIZE_72PX,
];

const fontSize = makeDynamicStyles(prefix, 'fontSize');

export const toggleFontSize = fontSize.toggleDynamicStyles;
export const currentFontSize = fontSize.currentStyle;
export const fontSizeFn = fontSize.StyleFn;
