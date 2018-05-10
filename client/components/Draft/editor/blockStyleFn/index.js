import { alignmentStyleFn } from '../../features/alignment';
import { CODE_BLOCK } from '../../core/types/block';

const blockStyleFn = contentBlock => {
  let classNames = [];
  let blockType = contentBlock.getType();
  const alignmentClassNames = alignmentStyleFn(contentBlock);

  if (alignmentClassNames) {
    classNames.push(classNames.concat(alignmentClassNames));
  }

  if (blockType === CODE_BLOCK) {
    classNames.push('code');
  }

  return classNames.join(' ');
};

export default blockStyleFn;
