import { expect } from 'chai';
import {
  convertFromRaw,
  EditorState,
  ContentState,
  SelectionState,
} from 'draft-js';
import { List } from 'immutable';
import {
  addFontSizeStyle,
  removeFontSizeStyles,
  customStyleFn,
  FONT_SIZE_8PX,
  FONT_SIZE_10PX,
  FONT_SIZE_12PX,
  FONT_SIZE_16PX,
  FONT_SIZE_24PX,
} from './index';

describe('toolbar color functionality', () => {
  describe('addColorStyle', () => {
    const contentState = ContentState.createFromText('block1;block2', ';');
    const editorState = EditorState.createWithContent(contentState);
    const firstBlock = editorState.getCurrentContent().getFirstBlock();
    const lastBlock = editorState.getCurrentContent().getLastBlock();
    const newSelection = SelectionState.createEmpty();
    const selection = newSelection.merge({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
    });
    const newEditorState = EditorState.forceSelection(editorState, selection);

    it('should add a fontSize Style', () => {
      const editorStateWithColor = addFontSizeStyle(newEditorState, FONT_SIZE_8PX);
      const inlineStyles = editorStateWithColor.getCurrentInlineStyle();
      expect(inlineStyles.has(FONT_SIZE_8PX)).to.equal(true);
    });
  });

  describe('removeColorStyle', () => {
    const contentState = {
      entityMap: {},
      blocks: [
        {
          key: '2b7c2',
          text: 'block1',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 6,
              style: FONT_SIZE_10PX,
            },
            {
              offset: 0,
              length: 2,
              style: FONT_SIZE_16PX,
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: '8p77t',
          text: 'block2',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 6,
              style: FONT_SIZE_24PX,
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
    };
    const editorState = EditorState.createWithContent(convertFromRaw(contentState));
    const firstBlock = editorState.getCurrentContent().getFirstBlock();
    const lastBlock = editorState.getCurrentContent().getLastBlock();
    const newSelection = SelectionState.createEmpty();
    const selection = newSelection.merge({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
    });
    const newEditorState = EditorState.forceSelection(editorState, selection);

    it('should fontSizeStyles the inline color styles', () => {
      const editorStateWithoutColorStyles = removeFontSizeStyles(newEditorState);
      const inlineStyles = editorStateWithoutColorStyles.getCurrentInlineStyle();
      expect(inlineStyles.toJS()).to.deep.equal([]);
    });
  });

  describe('customStyleFn', () => {
    it('should return a css color object', () => {
      const result = customStyleFn(List([FONT_SIZE_8PX, FONT_SIZE_12PX]));
      expect(result).to.deep.equal({ fontSize: '8px' });
    });
  });
});
