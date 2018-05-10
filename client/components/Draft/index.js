import React from 'react';
import { fromJS } from 'immutable';
import { Editor, EditorState, RichUtils, AtomicBlockUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Toolbar from './features/Toolbar';
// core
import {
  fromRawContentStateToEditorState,
  contentStateLogger,
  changeBlockDataForBlockKeys,
} from './core';
// features
import { toggleColor, currentColor } from './features/fontColor/index';
import { toggleFontSize, currentFontSize } from './features/fontSize/index';
import { toggleFontFamily, currentFontFamily } from './features/fontFamily/index';
import { toggleBlockAlignment, getActiveBlockAlignment } from './features/alignment';
// editor props
import blockStyleFn from './editor/blockStyleFn';
import customStyleFn from './editor/customStyleFn';
import customStyleMap from './editor/customStyleMap';
import blockRendererFn from './editor/blockRenderFn';
import extendedBlockRenderMap from './editor/blockRenderMap';
import handleBeforeInput from './editor/handleBeforeInput';
import { handleKeyCommand, myKeyBindingFn } from './editor/keyBindingFn';
// css
import './core/styles/styles.scss';
import './features/alignment/styles/alignment.scss';
import './features/alignment/styles/alignment-buttons.scss';

class RichEditor extends React.Component {
  static defaultProps = {
    editorState: EditorState.createEmpty()
  };

  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState,
      readOnly: false,
    };
    this.getEditorState = () => this.state.editorState;
    this.setEditorRef = ref => this.editor = ref;
    this.focusEditor = () => this.editor.focus();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      editorState: nextProps.editorState,
    })
  };

  updateEditorState = editorState => {
    const onChange = typeof this.props.onChange === 'function'
      ? () => this.props.onChange(editorState)
      : null;

    this.setState({ editorState }, onChange);
  };

  onTab = e => {
    const maxDepth = 4;
    this.updateEditorState(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  toggleBlockType = blockType => {
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  toggleBlockAlignment = alignment => {
    const newEditorState = toggleBlockAlignment(this.state.editorState, alignment);

    return this.updateEditorState(newEditorState);
  };

  toggleFontSize = fontSize => {
    const newEditorState = toggleFontSize(this.state.editorState, fontSize);

    return this.updateEditorState(newEditorState);
  };

  toggleColor = color => {
    const newEditorState = toggleColor(this.state.editorState, color);

    return this.updateEditorState(newEditorState);
  };

  toggleFontFamily = fontFamily => {
    const newEditorState = toggleFontFamily(this.state.editorState, fontFamily);

    return this.updateEditorState(newEditorState);
  };

  addMedia = ({ type, ...rest }) => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();

    console.log('before checking collapsed');
    if (!selection.isCollapsed()) {
      console.log('selection must be collapsed before adding media');
      return;
    }

    if (RichUtils.getCurrentBlockType(this.state.editorState) === 'atomic') {
      console.log('cannot have atomic block selected');
      return;
    }

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'atomic',
      'IMMUTABLE',
      fromJS({ type })// only leave the type here. Trow everything else into blockData
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const editorStateWithNewBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    const startKey = editorState.getSelection().getStartKey();
    const newBlockKey = editorStateWithNewBlock.getCurrentContent().getBlockAfter(startKey).getKey();
    const editorStateWithBlockData = changeBlockDataForBlockKeys(
      editorStateWithNewBlock,
      [newBlockKey],
      fromJS(rest)
    );

    this.updateEditorState(editorStateWithBlockData);
  };

  toggleReadOnly = value => {
    this.setState({ readOnly: value || !this.state.readOnly });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="text-editor-component">
        {!this.props.readOnly && <Toolbar
          addMedia={this.addMedia}
          activeBlockAlignment={getActiveBlockAlignment(this.state.editorState)}
          currentFontSize={currentFontSize(this.state.editorState)}
          currentFontFamily={currentFontFamily(this.state.editorState)}
          currentColor={currentColor(this.state.editorState)}
          toggleBlockType={this.toggleBlockType}
          toggleInlineStyle={this.toggleInlineStyle}
          toggleColor={this.toggleColor}
          toggleBlockAlignment={this.toggleBlockAlignment}
          toggleFontSize={this.toggleFontSize}
          toggleFontFamily={this.toggleFontFamily}

        />}
        {this.props.children}

        <div className="text-editor" onClick={this.focusEditor}>
          <Editor
            ref={this.setEditorRef}
            blockRendererFn={blockRendererFn(
              this.updateEditorState,
              this.getEditorState,
              this.toggleReadOnly,
              this.state.readOnly,
            )}
            blockRenderMap={extendedBlockRenderMap}
            blockStyleFn={blockStyleFn}
            customStyleMap={customStyleMap}
            customStyleFn={customStyleFn}
            editorState={editorState}
            handleBeforeInput={handleBeforeInput(this.getEditorState)}
            handleKeyCommand={handleKeyCommand(
              this.getEditorState,
              this.updateEditorState
            )}
            keyBindingFn={myKeyBindingFn(this.getEditorState)}
            onChange={this.updateEditorState}
            onTab={this.onTab}
            placeholder="Tell a story..."
            readOnly={this.props.readOnly}
            spellCheck
          />
        </div>
      </div>
    );
  }
}

export default RichEditor;
