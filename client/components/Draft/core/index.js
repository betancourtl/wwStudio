import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
  SelectionState,
} from 'draft-js';
import { Map } from 'immutable';

export const reduceBlockKeysAndAddData = (
  oldContentState,
  blockKeys,
  blockData,
  dataPath = []
) => {
  return blockKeys.reduce((contentState, blockKey) => {
    const block = contentState.getBlockForKey(blockKey);
    const blockMap = contentState.getBlockMap();
    const path = ['data', ...dataPath];
    const newBlock = block.mergeIn(path, blockData);
    return contentState.merge({ blockMap: blockMap.set(blockKey, newBlock) });
  }, oldContentState);
};

// only needs blocks an array of blocks
export const changeBlockData = (editorState, blockData, dataPath = []) => {
  const oldContentState = editorState.getCurrentContent();
  const selectedBlockKeys = getSelectedBlockKeys(editorState);
  const newContentState = reduceBlockKeysAndAddData(oldContentState, selectedBlockKeys, blockData, dataPath);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

// if no path is specified it saves in the data property
export const changeBlockDataForBlockKeys = (
  editorState,
  blockKeys,
  blockData,
  dataPath = []
) => {
  const oldContentState = editorState.getCurrentContent();
  const newContentState = reduceBlockKeysAndAddData(oldContentState, blockKeys, blockData, dataPath);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

// This functionality has been taken from draft-js and modified for re-usability purposes.
// Maps over the selected characters, and applies a function to each character.
// Characters are of type CharacterMetadata. Look up the draftJS API to see what
// operations can be performed on characters.
export const mapSelectedCharacters = callback => editorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockMap = contentState.getBlockMap();
  const startKey = selectionState.getStartKey();
  const startOffset = selectionState.getStartOffset();
  const endKey = selectionState.getEndKey();
  const endOffset = selectionState.getEndOffset();

  const newBlocks = blockMap.skipUntil((_, k) => {
    return k === startKey;
  }).takeUntil((_, k) => {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map((block, blockKey) => {
    let sliceStart;
    let sliceEnd;

    // sliceStart -> where the selection starts
    // endSlice -> Where the selection ends

    // Only 1 block selected
    if (startKey === endKey) {
      sliceStart = startOffset;
      sliceEnd = endOffset;
      // Gets the selected characters of the block when multiple blocks are selected.
    } else {
      sliceStart = blockKey === startKey ? startOffset : 0;
      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    }

    // Get the characters of the current block
    let chars = block.getCharacterList();
    let current;
    while (sliceStart < sliceEnd) {
      current = chars.get(sliceStart);
      const newChar = callback(current);
      chars = chars.set(sliceStart, newChar);
      sliceStart++;
    }

    return block.set('characterList', chars);
  });

  const newContentState = contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  });

  return EditorState.push(editorState, newContentState, 'change-inline-style');
};

export const getSelectedBlocks = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const startKey = editorState.getSelection().getStartKey();
  const endKey = editorState.getSelection().getEndKey();

  return blockMap.skipUntil((__, k) => k === startKey)
                 .takeUntil((__, k) => k === endKey)
                 .concat(Map([[endKey, blockMap.get(endKey)]]));
};

export const getSelectedBlocksAsList = editorState => {
  return getSelectedBlocks(editorState).toList();
};

export const getSelectedBlockKeys = editorState => {
  const selectedBlockList = getSelectedBlocksAsList(editorState);
  if (!selectedBlockList.size) {
    return [];
  }
  return selectedBlockList.map(block => block.key);
};

export const reduceAndRemoveBlockData = (oldContentState, blockKeys, dataPath) => {
  return blockKeys.reduce(
    (contentState, blockKey) => {
      const block = contentState.getBlockForKey(blockKey);
      const blockMap = contentState.getBlockMap();
      const dataExists = block.get('data').hasIn(dataPath);
      if (!dataExists) {
        return contentState;
      }

      const newBlock = block.deleteIn(['data', ...dataPath]);
      return contentState.merge({ blockMap: blockMap.set(blockKey, newBlock) });
    }, oldContentState
  );
};

export const removeBlockData = (editorState, dataPath) => {
  const oldContentState = editorState.getCurrentContent();
  const selectedBlockKeys = getSelectedBlockKeys(editorState);
  const newContentState = reduceAndRemoveBlockData(oldContentState, selectedBlockKeys, dataPath);
  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export const removeBlockDataForBlockKeys = (editorState, blockKeys, dataPath) => {
  const oldContentState = editorState.getCurrentContent();
  const newContentState = reduceAndRemoveBlockData(oldContentState, blockKeys, dataPath);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export const fromRawContentStateToEditorState = contentState => {
  return contentState
    ? EditorState.createWithContent(convertFromRaw(contentState))
    : EditorState.createEmpty();
};

// Logs contentState in a readable format.
export const contentStateLogger = editorState => {
  const result = JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 4);
  const newResult = JSON.parse(result);
  const contentState = JSON.stringify({ contentState: newResult }, null, 4);
  // unquotes object keys
  const keyQuotes = /"(.+)"(?=:)/g;
  const newContentState = contentState.replace(keyQuotes, '$1');
  console.log(newContentState);
};

export const removeBlockWithKey = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const newBlockMap = blockMap.filter(block => block.getKey() !== blockKey);

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
  });

  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const blockBeforeKey = contentState.getBlockBefore(startKey).getKey();
  const newSelection = SelectionState.createEmpty().merge({
    ...selection.toJS(),
    anchorKey: blockBeforeKey,
    focusKey: blockBeforeKey,
  });

  return EditorState.forceSelection(EditorState.push(editorState, newContentState), newSelection);
};

export const insertNewBlock = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockList = contentState.getBlockMap().toList();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const blockIndex = blockList.findIndex(block => block.getKey() === startKey);
  const blockMap = contentState.getBlockMap();
  const firstSlice = blockMap.slice(0, blockIndex + 1);
  const lastSlice = blockMap.slice(blockIndex + 1);
  const tempBlockMap = ContentState.createFromText('').getBlockMap();
  const fistBlock = tempBlockMap.first();

  // Generate the blockMap
  const newBlockMap = [fistBlock].reduce((prevBlockMap, newBlock) => {
    return prevBlockMap.set(newBlock.getKey(), newBlock);
  }, firstSlice).concat(lastSlice);

  // Modify selection to place cursor at new block
  const selectionKey = fistBlock.getKey();
  const newSelection = SelectionState.createEmpty().merge({
    anchorKey: selectionKey,
    focusKey: selectionKey,
    anchorOffset: 0,
    focusOffset: 0,
  });

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
  });

  // Force the editor to render the cursor correctly
  return EditorState.forceSelection(
    EditorState.push(editorState, newContentState),
    newSelection);
};

const removeLastWordRegex = /\b(\w+)\W*$/;

export const replaceLastWordWith = (string, maxChars, replacer) => {
  if (string.length <= maxChars) return string;

  return string
    .slice(0, (maxChars - replacer.length))
    .replace(removeLastWordRegex, replacer);
};

export const grabUnstyledChars = (editorState, qty = 300, replacer = '...') => {
  try {
    const string = editorState
      .getCurrentContent()
      .getBlockMap()
      .reduce((acc, block) => {
        const accLength = acc.length;
        if (accLength >= qty) return acc;
        if (block.getType() !== 'unstyled') return acc;

        return [acc].concat(block.getText()).join(' ');
      }, '');

    return replaceLastWordWith(string, qty, replacer)

  } catch (err) {
    console.log('Error creating preview text', err);
    return '';
  }
};
