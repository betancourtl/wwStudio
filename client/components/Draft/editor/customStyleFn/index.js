import { fontSizeFn } from '../../features/fontSize/index';
import { colorStyleFn } from '../../features/fontColor/index';
import { fontFamilyFn } from '../../features/fontFamily/index';

const functionList = [fontSizeFn, colorStyleFn, fontFamilyFn];

/**
 * Accepts a list of functions that take css style as a parameter
 * then it reduces it and merge the css object.
 * @param style
 * @returns {*}
 */
const customStyleFn = style => {
  const result = functionList.reduce((css, fn) => {
    return { ...css, ...fn(style) };
  }, {});

  return result;
};

export default customStyleFn;
