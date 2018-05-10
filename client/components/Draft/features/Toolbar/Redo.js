import React from 'react';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from '../../core/components/Icon';

const Redo = () => {
  return (
    <ButtonGroup>
      <Button>
        <Icon icon="undo"/>
      </Button>
      <Button>
        <Icon icon="repeat"/>
      </Button>
    </ButtonGroup>
  );
};

export default Redo;
