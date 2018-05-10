import React from 'react';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from '../../core/components/Icon';

const Save = () => {
  return (
    <ButtonGroup>
      <Button>
        <Icon icon="save"/>
      </Button>
      <Button>
        <Icon icon="folder-open"/>
      </Button>
    </ButtonGroup>
  );
};

export default Save;
