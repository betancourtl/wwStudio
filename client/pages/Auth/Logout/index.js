import React, { Component } from 'react';
import * as R from 'ramda';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

class Logout extends Component {
  componentWillMount() {
    this.props.session.endSession();
  }

  render() {
    return (
      <div className="logout-page">
        <Redirect to="/login" />
      </div>
    );
  };
}

Logout.propTypes = {};

Logout.defaultProps = {};

export default R.compose(
  inject('session'),
  observer,
)(Logout);