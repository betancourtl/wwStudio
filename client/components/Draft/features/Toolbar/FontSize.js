import React from 'react';
import ButtonGroup from './components/ButtonGroup';
import ButtonOption from './components/ButtonOption';
import ButtonToggle from './components/ButtonToggle';
import { fontSizes, prefix } from '../../features/fontSize';

const createOptions = props => {
  return fontSizes.map(fontSize => {
    return (
      <ButtonOption
        key={fontSize}
        value={fontSize}
        onClick={() => props.toggleFontSize(fontSize)}
      >
        {fontSize.replace(prefix, '')}
      </ButtonOption>
    );
  });
};

const FontSize = props => {
  return (
    <ButtonGroup>
      <ButtonToggle width="50px">
        {createOptions(props)}
      </ButtonToggle>
    </ButtonGroup>
  );
};

export default FontSize;
