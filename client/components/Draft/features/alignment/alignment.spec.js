// import { expect } from 'chai';
// import { fromJS } from 'immutable';
// import { EditorState, convertFromRaw } from 'draft-js';
// import { blockStyleFn, isTypeAtomic, isTypeText, isTypeBlockQuote } from './';
// import { blockStyles } from '../draft-types/blockTypes';
//
// describe('alignment tests', () => {
//   const rawContentState = {
//     entityMap: {},
//     blocks: [
//       {
//         key: '7du0s',
//         text: 'atomic-block',
//         type: 'atomic',
//         depth: 0,
//         inlineStyleRanges: [],
//         entityRanges: [],
//         data: fromJS({
//           alignment: 'left',
//         }),
//       },
//       {
//         key: '7du09s',
//         text: 'text-block',
//         type: blockStyles.HEADER_SIX,
//         depth: 0,
//         inlineStyleRanges: [],
//         entityRanges: [],
//         data: fromJS({
//           alignment: 'left'
//         }),
//       },
//       {
//         key: '7duz9s',
//         text: 'text-block',
//         type: blockStyles.BLOCKQUOTE,
//         depth: 0,
//         inlineStyleRanges: [],
//         entityRanges: [],
//         data: fromJS({
//           alignment: 'left'
//         }),
//       },
//     ],
//   };
//   const editorState = EditorState.createWithContent(convertFromRaw(rawContentState));
//   const contentState = editorState.getCurrentContent();
//   const firstBlock = contentState.getFirstBlock();
//   const secondBlock = contentState.getBlockAfter(firstBlock.getKey());
//   const thirdBlock = contentState.getBlockAfter(secondBlock.getKey());
//   describe('isTypeAtomic', () => {
//     it('should return true if the block is type atomic', () => {
//       const isAtomic = isTypeAtomic(firstBlock);
//       expect(isAtomic).to.equal(true);
//     });
//
//     it('should return false if its not type atomic', () => {
//       const isAtomic = isTypeAtomic(secondBlock);
//       expect(isAtomic).to.equal(false);
//     });
//
//   });
//   describe('isTypeText', () => {
//     it('should return true if the block is any text type', () => {
//       const isText = isTypeText(firstBlock);
//       expect(isText).to.equal(false);
//     });
//
//     it('should return false if its not type atomic', () => {
//       const isText = isTypeText(secondBlock);
//       expect(isText).to.equal(true);
//     });
//   });
//   describe('isTypeBlockQuote', () => {
//     it('should return true if the block is type blockquote', () => {
//       const isBlockQuote = isTypeBlockQuote(thirdBlock);
//       expect(isBlockQuote).to.equal(true);
//     });
//     it('should return false if the block is not type blockquote', () => {
//       const isBlockQuote = isTypeBlockQuote(secondBlock);
//       expect(isBlockQuote).to.equal(false);
//     });
//   });
//   describe('blockStyleFn', () => {
//     it('returns atomic-alignment className', () => {
//       const classNames = blockStyleFn(firstBlock);
//       expect(classNames).to.deep.equal('atomic-left');
//     });
//     it('returns text-alignment className', () => {
//       const classNames = blockStyleFn(secondBlock);
//       expect(classNames).to.deep.equal('text-left');
//     });
//     it('returns blockQuote className', () => {
//       const classNames = blockStyleFn(thirdBlock);
//       expect(classNames).to.deep.equal('text-left MyEditor-blockquote');
//     });
//   });
// });
