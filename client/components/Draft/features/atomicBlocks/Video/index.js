import React from 'react';
import PropTypes from 'prop-types';
import './VideoBlock.scss';

const Video = props => {
  const src = props.block.getData().get('src');
  return (
    <div className="media-component-video-wrapper">
      <iframe
        className="media-component-video-wrapper__iframe"
        src={src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

Video.propTypes = {
  block: PropTypes.object.isRequired,
};

export default Video;
