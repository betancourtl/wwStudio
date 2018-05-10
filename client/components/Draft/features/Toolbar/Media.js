import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from './components/ButtonGroup';
import ImageButton from './ImageButton';
import VideoButton from './VideoButton';

const Media = props => {
  return (
    <ButtonGroup>
      <ImageButton
        addMedia={props.addMedia}
      />
      <VideoButton
        addMedia={props.addMedia}
      />
    </ButtonGroup>
  );
};

Media.propTypes = {
  addMedia: PropTypes.func.isRequired,
};

export default Media;
