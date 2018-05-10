import { EditorState, Modifier } from 'draft-js';
import { mapSelectedCharacters } from '../../core';

const makeDynamicStyles = (prefix = 'DEFAULT_PROP', cssProp = 'cssProperty') => {

  const addDynamicStyle = (editorState, style) => {
    const newContentState = Modifier.applyInlineStyle(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      style
    );
    return EditorState.push(editorState, newContentState, 'change-inline-style');
  };

  const filterDynamicStyle = char => {
    const charStyles = char.get('style');
    const filteredStyles = charStyles.filter(style => !style.startsWith(prefix));
    return char.set('style', filteredStyles);
  };

  const removeDynamicStyle = mapSelectedCharacters(filterDynamicStyle);

  const toggleDynamicStyles = (editorState, style) => {
    const editorStateWithoutColorStyles = removeDynamicStyle(editorState);
    const currentInlineStyles = editorState.getCurrentInlineStyle();

    if (!currentInlineStyles.has(style)) {
      return addDynamicStyle(editorStateWithoutColorStyles, style);
    }

    return editorStateWithoutColorStyles;
  };

  const StyleFn = style => {
    if (!style.size) {
      return {};
    }
    const value = style.filter(val => val.startsWith(prefix)).first();
    if (value) {
      const newVal = value.replace(prefix, '');
      return { [cssProp]: newVal };
    }
    return {};
  };

  const currentStyle = editorState => {
    const selectionStyles = editorState.getCurrentInlineStyle();
    if (!selectionStyles.size) {
      return '';
    }
    return selectionStyles.filter(style => style.startsWith(prefix)).first();
  };

  return {
    addDynamicStyle,
    currentStyle,
    filterDynamicStyle,
    removeDynamicStyle,
    toggleDynamicStyles,
    StyleFn,
  };
};

export default makeDynamicStyles;
