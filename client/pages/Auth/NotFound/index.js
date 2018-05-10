import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ location }) => {
  return (
    <h3>No match for <code>{location.pathname}</code></h3>
  );
};

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
