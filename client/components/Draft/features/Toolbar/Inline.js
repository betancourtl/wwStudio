import React from 'react';
import PropTypes from 'prop-types';
import Button from './components/Button';
import ButtonGroup from './components/ButtonGroup';
import Icon from '../../core/components/Icon';
import * as inlineStyles from '../../core/types/inline';

const INLINE_STYLES = [
  { icon: 'bold', style: inlineStyles.BOLD },
  { icon: 'italic', style: inlineStyles.ITALIC },
  { icon: 'underline', style: inlineStyles.UNDERLINE },
  { icon: 'strikethrough', style: inlineStyles.STRIKETHROUGH },
];

const createInlineButtons = props => {
  return INLINE_STYLES.map(style => {
    return (
      <Button
        onClick={() => props.toggleInlineStyle(style.style)}
        key={style.style}
      >
        <Icon icon={style.icon} />
      </Button>
    );
  });
};

const Inline = props => {
  return (
    <ButtonGroup>
      {createInlineButtons(props)}
    </ButtonGroup>
  );
};

Inline.propTypes = {
  toggleInlineStyle: PropTypes.func.isRequired,
};

export default Inline;
