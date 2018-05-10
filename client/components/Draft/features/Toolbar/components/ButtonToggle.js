import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonSelect from './ButtonSelect';
import ButtonSelector from './ButtonSelector';

class ButtonToggle extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isRenderable: false,
      selected: null,
    };
  }

  componentWillMount() {
    const isRenderable = this.props.children.every(child => child.key);
    this.setState({ isRenderable });
  }

  toggleButton = () => {
    this.setState(
      {
        isOpen: !this.state.isOpen,
      }
    );
  };

  selectOption(value) {
    this.setState({ selected: value });
  }

  childrenWithProps = children => React.Children.map(
    children,
    child => React.cloneElement(
      child,
      {
        onClick: () => {
          this.selectOption(child.key);
          if (child.props.onClick) {
            child.props.onClick();
          }
        },
      }
    )
  );

  selectedOption = () => {
    if (this.props.children) {
      const filteredChild = this.props.children.filter(
        child => child.key === this.state.selected);

      if (filteredChild.length) {
        return this.childrenWithProps([filteredChild]);
      }

      return this.props.children[0];
    }

    return null;
  };

  render() {
    if (!this.state.isRenderable) {
      console.log('Please pass a key to the buttonOption');
      return null;
    }
    const classNames = this.state.isOpen
      ? 'button-toggle'
      : 'button-toggle hide-options';

    return (
      <span className={classNames}>
        <span
          style={{ width: this.props.width }}
          className="selected-option"
        >
          {this.selectedOption()}
        </span>
        <ButtonSelect width={this.props.optionsWidth}>
          {this.childrenWithProps(this.props.children)}
        </ButtonSelect>
        <ButtonSelector onClick={this.toggleButton}/>
      </span>
    );
  }
}

ButtonToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  width: PropTypes.string,
  optionsWidth: PropTypes.string,
};

export default ButtonToggle;
