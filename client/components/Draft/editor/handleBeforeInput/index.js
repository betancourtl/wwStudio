import { atomicHandleInput } from '../../features/atomicBlocks/Image/image';

const handleBeforeInput = getEditorState => char => {
  const editorState = getEditorState();
  const isHandled = [atomicHandleInput].some(fn => {
    return fn(editorState) === 'handled';
  });

  if (isHandled) {
    return 'handled';
  }

  return 'not-handled';
};

export default handleBeforeInput;
