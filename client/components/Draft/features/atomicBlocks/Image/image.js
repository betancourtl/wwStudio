import { EditorState, SelectionState } from 'draft-js';
import { fromJS, Map } from 'immutable';
import {
  changeBlockDataForBlockKeys,
  removeBlockWithKey,
  insertNewBlock,
} from '../../../core';

export const editorStateWithoutFocus = editorState => {
  const selection = editorState.getSelection();
  const newSelection = SelectionState.createEmpty().merge({
    ...selection.toJS(),
    hasFocus: false,
  });

  return EditorState.acceptSelection(editorState, newSelection);
};

export const addBlockData = (editorState, blockKey) => {
  return data => changeBlockDataForBlockKeys(editorState, [blockKey], fromJS(data));
};

export const selectImage = (block, editorState) => {
  const blockKey = block.getKey();
  const newSelection = SelectionState.createEmpty().merge({
    anchorKey: blockKey,
    focusKey: blockKey,
    anchorOffset: 0,
    focusOffset: 0,
  });

  return EditorState.forceSelection(editorState, newSelection);
};

export const isImageSelected = (block, editorState) => {
  const blockKey = block.getKey();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();

  return startKey === blockKey && endKey === blockKey;
};

export const atomicSelection = editorState => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const firstBlockKey = selection.getStartKey();
  const sameBlockKeys = selection.getStartKey() === selection.getEndKey();
  const block = editorState.getCurrentContent().getBlockForKey(firstBlockKey);
  const blockType = block.getType();

  if (blockType === 'atomic' && sameBlockKeys) {
    const entityKey = block.getEntityAt(0);
    if (!entityKey) {
      return null;
    }

    const entityData = contentState.getEntity(entityKey).getData();

    if (!entityData) {
      return null;
    }

    const checkedData = Map.isMap(entityData) ? entityData : fromJS(entityData);

    if (checkedData.get('type') === 'image') {
      return block.getKey();
    }
  }

  return null;
};

// key bindings
export const BACKSPACE_ON_ATOMIC_BLOCK = 'BACKSPACE_ON_ATOMIC_BLOCK';
export const ENTER_ON_ATOMIC_BLOCK = 'ENTER_ON_ATOMIC_BLOCK';

export const atomicKeyBindings = (editorState, e) => {
  const backSpace = 8;
  const enter = 13;
  if (e.keyCode === backSpace) {
    if (atomicSelection(editorState)) return BACKSPACE_ON_ATOMIC_BLOCK;
  }
  if (e.keyCode === enter) {
    if (atomicSelection(editorState)) return ENTER_ON_ATOMIC_BLOCK;
  }

  return null;
};

export const atomicKeyCommands = (command, editorState, updateEditorState) => {
  if (command === BACKSPACE_ON_ATOMIC_BLOCK) {
    const blockKey = atomicSelection(editorState);
    const newEditorState = removeBlockWithKey(editorState, blockKey);
    updateEditorState(newEditorState);
    return 'handled';
  }

  if (command === ENTER_ON_ATOMIC_BLOCK) {
    const newEditorState = insertNewBlock(editorState);
    updateEditorState(newEditorState);
    return 'handled';
  }

  return 'not-handled';
};

export const atomicHandleInput = editorState => {
  const isValid = !!atomicSelection(editorState);
  if (isValid) {
    return 'handled';
  }
  return 'not-handled';
};
