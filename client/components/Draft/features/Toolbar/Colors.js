import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from '../../core/components/Icon';
import { prefix } from '../../features/fontColor';

const ColorPicker = props => {
  const toggleColor = color => {
    const prefixedColor = `${prefix}${color.hex}`;
    props.toggle(prefixedColor);
  };
  return (
    <SketchPicker
      color={props.current.replace(prefix, '')}
      onChangeComplete={toggleColor}
    />
  );
};

ColorPicker.propTypes = {
  toggle: PropTypes.func.isRequired,
  current: PropTypes.string,
};

const Colors = props => {
  const color =  props.currentColor ? props.currentColor.replace(prefix, '') : '#333';
  const style = {
    color,
  };
  return (
    <ButtonGroup>
      <Button>
        <Icon
          icon="square"
          style={style}
        />
        <span style={{ position: 'fixed', top: 0, right: 0 }}>
          <ColorPicker
            toggle={props.toggleColor}
            current={color}
          />
        </span>
      </Button>
    </ButtonGroup>
  );
};

Colors.propTypes = {
  toggleColor: PropTypes.func,
};

export default Colors;
