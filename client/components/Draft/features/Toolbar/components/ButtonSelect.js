import React from 'react';
import PropTypes from 'prop-types';

const ButtonSelect = props => {
  return (
    <span
      className="button-select"
      style={{ width: props.width ? props.width : '100%' }}
    >
      {props.children}
    </span>
  );
};

ButtonSelect.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  width: PropTypes.string,
};


export default ButtonSelect;
