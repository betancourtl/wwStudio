import React from 'react';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from '../../core/components/Icon';

const ALIGNMENT_STYLES = [
  { icon: 'align-left', alignment: 'left' },
  { icon: 'align-center', alignment: 'center' },
  { icon: 'align-right', alignment: 'right' },
];

const createAlignmentButtons = props => {
  return ALIGNMENT_STYLES.map(style => {
    return (
      <Button
        onClick={() => props.toggleBlockAlignment(style.alignment)}
        key={style.alignment}
      >
        <Icon icon={style.icon}/>
      </Button>
    );
  });
};

const Alignment = props => {
  return (
    <ButtonGroup>
      {createAlignmentButtons(props)}
    </ButtonGroup>
  );
};

export default Alignment;
