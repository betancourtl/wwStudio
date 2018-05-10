import React from 'react';
import PropTypes from 'prop-types';

const Posts = props => {
  return (
    <div className="dashboard-posts-page">
      Dashboard Posts Page
      {props.children}
    </div>
  );
};

Posts.propTypes = {};

Posts.defaultProps = {};

export default Posts;