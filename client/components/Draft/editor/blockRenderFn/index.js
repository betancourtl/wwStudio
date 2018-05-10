import MediaComponent from '../../features/atomicBlocks';
import { ATOMIC } from '../../core/types/block';

const blockRendererFn = (
  updateEditorState,
  getEditorState,
  toggleReadOnly,
  readOnly,
) => contentBlock => {
  const type = contentBlock.getType();
  if (type === ATOMIC) {
    return {
      component: MediaComponent,
      editable: false,
      props: {
        updateEditorState,
        getEditorState,
        toggleReadOnly,
        readOnly,
      },
    };
  }

  return null;
};

export default blockRendererFn;
