import React from 'react';
import PropTypes from 'prop-types';
import Alignment from './Alignment';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import Headings from './Headings';
import Inline from './Inline';
import Lists from './Lists';
import Media from './Media';
import Redo from './Redo';
import Save from './Save';
import './NewControls.scss';

const Toolbar = props => {
  return (
    <div className="text-editor-toolbar">
      <Headings
        toggleBlockType={props.toggleBlockType}
      />
      <FontSize
        toggleFontSize={props.toggleFontSize}
        currentFontSize={props.currentFontSize}
      />
      <FontFamily
        toggleFontFamily={props.toggleFontFamily}
        currentFontFamily={props.currentFontFamily}
      />
      <Inline
        toggleInlineStyle={props.toggleInlineStyle}
      />
      <Alignment
        toggleBlockAlignment={props.toggleBlockAlignment}
        activeBlockAlignment={props.activeBlockAlignment}
      />
      <Media
        addMedia={props.addMedia}
      />
      <Lists
        toggleBlockType={props.toggleBlockType}
      />
      <Save />
      <Redo />
    </div>
  );
};

Toolbar.propTypes = {
  toggleBlockType: PropTypes.func.isRequired,
  toggleBlockAlignment: PropTypes.func.isRequired,
  toggleColor: PropTypes.func.isRequired,
  toggleInlineStyle: PropTypes.func.isRequired,
  toggleFontFamily: PropTypes.func.isRequired,
  toggleFontSize: PropTypes.func.isRequired,
  activeBlockAlignment: PropTypes.string.isRequired,
  addMedia: PropTypes.func.isRequired,
  // currentFontFamily: PropTypes.string.isRequired,
  // currentFontSize: PropTypes.string.isRequired,
};

export default Toolbar;
