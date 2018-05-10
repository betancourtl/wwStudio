import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button';
import Icon from '../../core/components/Icon';
import Modal from '../../core/components/Modal';
import ModalInputGroup from '../../core/components/ModalInputGroup';

class ImageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      type: 'image',
      description: 'addDescription',
      showModal: false,
    };
  }

  updateState = (prop, val) => {
    this.setState({ [prop]: val });
  };

  addVideo = () => {
    this.props.addMedia({
      src: this.state.src,
      description: this.state.description,
      type: this.state.type,
    });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const imageModal = (
      <Modal
        title="Insert / editor image"
        onCloseClick={this.toggleModal}
        onOkClick={() => { this.addVideo(); this.toggleModal(); }}
        onCancelClick={this.toggleModal}
      >
        <ModalInputGroup title="Source">
          <input
            type="text"
            onChange={e => this.updateState('src', e.target.value)}
            value={this.state.src}
          />
        </ModalInputGroup>
        <ModalInputGroup title="Image description">
          <input
            type="text"
            onChange={e => this.updateState('description', e.target.value)}
            value={this.state.description}
          />
        </ModalInputGroup>
        <ModalInputGroup title="Upload file">
          <input type="file"/>
        </ModalInputGroup>
      </Modal>
    );

    return (
      <Button
        onClick={e => this.state.showModal ? null : this.toggleModal()}>
        <Icon icon={'image'}/>
        {this.state.showModal ? imageModal : null}
      </Button>
    );
  }
}

ImageButton.defaultProps = {
  src: 'https://www.gamecrate.com/sites/default/files/wp-content/uploads/2015/01/LoL_free_gifts_for_well-behaved_players1.jpg',
};

ImageButton.propTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default ImageButton;
