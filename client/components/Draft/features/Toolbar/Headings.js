import React from 'react';
import ButtonGroup from './components/ButtonGroup';
import ButtonOption from './components/ButtonOption';
import ButtonToggle from './components/ButtonToggle';
import * as blockTypes from '../../core/types/block';

const BLOCK_TYPES = [
  { label: 'H1', style: blockTypes.H1 },
  { label: 'H2', style: blockTypes.H2 },
  { label: 'H3', style: blockTypes.H3 },
  { label: 'H4', style: blockTypes.H4 },
  { label: 'H5', style: blockTypes.H5 },
  { label: 'H6', style: blockTypes.H6 },
  { label: '</>', style: blockTypes.CODE_BLOCK },
];

const renderBlockTypes = props => {
  return BLOCK_TYPES.map(type => {
    return (
      <ButtonOption
        onClick={() => props.toggleBlockType(type.style)}
        key={type.style}
      >
        {type.label}
      </ButtonOption>
    );
  });
};

const Headings = props => {
  return (
    <ButtonGroup>
      <ButtonToggle>
        {renderBlockTypes(props)}
      </ButtonToggle>
    </ButtonGroup>

  );
};

export default Headings;
