import React from 'react';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from '../../core/components/Icon';
import * as blockTypes from '../../core/types/block';

const LIST_TYPES = [
  { icon: 'list-ul', style: blockTypes.UL },
  { icon: 'list-ol', style: blockTypes.OL },
];

const renderBlockTypes = props => {
  return LIST_TYPES.map(type => {
    return (
      <Button
        onClick={() => props.toggleBlockType(type.style)}
        key={type.style}
      >
        <Icon icon={type.icon}/>
      </Button>
    );
  });
};

const List = props => {
  return (
    <ButtonGroup>
      {renderBlockTypes(props)}
    </ButtonGroup>

  );
};

export default List;
