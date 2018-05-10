import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react/index';
import { withRouter, Redirect } from 'react-router-dom';

const stores = ['auth', 'session'];

class ActivateUser extends Component {
  componentWillMount() {
    const { token: tokenFromParams } = this.props.match.params;

    if (!tokenFromParams) {
      console.log('invalid Token');
    }

    this.props.auth.activateUser(tokenFromParams)
      .then(() => {
        this.props.session.loginIfTokenIsValid();
        console.log('user has been activated');
      }).catch(err => {
      console.log('could not activate the user');
    })
  }

  render() {
    if (!this.props.match.params.token) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <Row className="activate-user-page">
        <Col xs={5} xsOffset={3}>
          User Activated click here to
        </Col>
      </Row>
    );
  }
}

ActivateUser.propTypes = {};

ActivateUser.defaultProps = {};

export default R.compose(
  inject(...stores),
  withRouter,
  observer,
)(ActivateUser)