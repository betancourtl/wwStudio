import React from 'react';
import ButtonGroup from './components/ButtonGroup';
import ButtonOption from './components/ButtonOption';
import ButtonToggle from './components/ButtonToggle';
import { styles, prefix } from '../../features/fontFamily';

const createOptions = props => {
  return styles.map(style => {
    return (
      <ButtonOption
        key={style}
        value={style}
        onClick={() => props.toggleFontFamily(style)}
      >
        {style.replace(prefix, '')}
      </ButtonOption>
    );
  });
};

const FontFamily = props => {
  return (
    <ButtonGroup>
      <ButtonToggle width="65px">
        {createOptions(props)}
      </ButtonToggle>
    </ButtonGroup>
  );
};

export default FontFamily;
