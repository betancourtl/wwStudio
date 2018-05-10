import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Modal = props => {
  return (
    <div className="modal">
      <div className="modal-contents">
        <div className="modal-header">
          <h2>{props.title}</h2>
          <Icon icon="times" onClick={props.onCloseClick}/>
        </div>
        <div className="modal-body">
          { props.children }
        </div>
        <div className="modal-footer">
          <button onClick={e => { e.preventDefault(); props.onOkClick(); }} className="success">
            Ok
          </button>
          <button onClick={props.onCancelClick} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  title: PropTypes.string.isRequired,
  onOkClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
};

export default Modal;
