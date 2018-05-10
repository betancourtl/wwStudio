import React from 'react';
import PropTypes from 'prop-types';

const Media = props => {
  return (
    <div className="dashboard-media-page">
      Dashboard Media Page
      {props.children}
    </div>
  );
};

Media.propTypes = {};

Media.defaultProps = {};

export default Media;