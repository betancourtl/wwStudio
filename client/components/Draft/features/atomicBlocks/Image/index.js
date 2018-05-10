import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../core/components/Icon';
import ImageModal from './ImageModal';
import {
  addBlockData,
  editorStateWithoutFocus,
  isImageSelected,
  selectImage,
} from './image';
import './Image.scss';

class Image extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
  }

  closeModal = () => {
    const { blockProps: { getEditorState, updateEditorState } } = this.props;
    this.setState({ showModal: false }, () => {
      this.props.blockProps.toggleReadOnly(false);
      updateEditorState(editorStateWithoutFocus(getEditorState()));
    });
  };

  openModal = () => {
    const { blockProps: { getEditorState, updateEditorState } } = this.props;
    this.setState({ showModal: true }, () => {
      this.props.blockProps.toggleReadOnly(true);
      updateEditorState(editorStateWithoutFocus(getEditorState()));
    });
  };

  updateBlockData = (prop, val) => {
    const { block, blockProps: { getEditorState, updateEditorState } } = this.props;
    const blockKey = block.getKey();
    const editorState = addBlockData(getEditorState(), blockKey)({ [prop]: val });

    return updateEditorState(editorStateWithoutFocus(editorState));
  };

  selectImage = () => {
    const { getEditorState, updateEditorState } = this.props.blockProps;
    const newEditorState = selectImage(this.props.block, getEditorState());

    return updateEditorState(newEditorState);
  };

  isImageSelected = () => {
    const { getEditorState } = this.props.blockProps;

    return isImageSelected(this.props.block, getEditorState());
  };

  handleFileInput = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      return this.updateBlockData('src', reader.result);
    };

    reader.readAsDataURL(file);
  };

  render() {
    const blockData = this.props.block.getData();

    const modal = (
      <ImageModal
        update={this.updateBlockData}
        handleUpload={this.handleFileInput}
        closeModal={this.closeModal}
        src={blockData.get('src')}
        width={blockData.get('width')}
        height={blockData.get('height')}
        defaultSrc={this.props.src}
        defaultWidth={this.props.width}
        defaultHeight={this.props.height}
      />
    );

    const imgStyles = {
      height: blockData.get('height') || this.props.height,
      width: blockData.get('width') || this.props.width,
      border: this.isImageSelected() ? '1px solid red' : null,
    };

    return (
      <div className="image-wrapper">
        {this.state.showModal && modal}
        <span onClick={this.openModal} className="focus-button">
          <Icon icon="cog"/>
        </span>
        <img
          ref="image"
          style={imgStyles}
          onClick={this.selectImage}
          src={blockData.get('src')}
          className="layout-1__image"
        />
      </div>
    );
  }
}

Image.defaultProps = {
  width: '450px',
  height: 'auto',
  src: 'http://placehold.it/450x300',
};

Image.propTypes = {
  blockProps: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  toggleReadOnly: PropTypes.func,
};

export default Image;
