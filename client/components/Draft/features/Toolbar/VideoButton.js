import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button';
import Icon from '../../core/components/Icon';
import Modal from '../../core/components/Modal';
import ModalInputGroup from '../../core/components/ModalInputGroup';

class VideoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      type: 'video',
      description: 'addDescription',
      showModal: false,
    };
  }

  updateSrc = src => {
    this.setState({ src });
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
        title="Insert Youtube Video"
        onCloseClick={this.toggleModal}
        onOkClick={() => { this.addVideo(); this.toggleModal(); }}
        onCancelClick={this.toggleModal}
      >
        <ModalInputGroup title="Source">
          <input
            type="text"
            onChange={e => this.updateSrc(e.target.value)}
            value={this.state.src}
          />
        </ModalInputGroup>
        <ModalInputGroup title="Video description">
          <input
            type="text"
            onChange={e => this.updateSrc(e.target.value)}
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
        <Icon icon={'film'}/>
        {this.state.showModal ? imageModal : null}
      </Button>
    );
  }
}

VideoButton.defaultProps = {
  src: 'https://www.youtube.com/embed/Jn92jhHN0_4',
};

VideoButton.propTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default VideoButton;
