import React from 'react';
import PropTypes from 'prop-types';

const ModalInputGroup = props => {
  return (
    <div className="modal-input-group">
      <span>{props.title}</span>
      { props.children }
    </div>
  );
};

ModalInputGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  title: PropTypes.string.isRequired,
};

export default ModalInputGroup;
