import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react/index';
import { withRouter } from 'react-router-dom';

const stores = ['auth'];

class ConfirmUserAccount extends Component {
  render() {
    const emailLink = (
      <a onClick={this.props.auth.sendAccountActivationEmail}>
        here
      </a>
    );

    return (
      <Row className="activate-user-page">
        <Col xs={5} xsOffset={3}>
          <p>To access this page you must confirm your account.</p>
          <p>Please check your e-mails.</p>
          <p>To re-send a new e-mail used to confirm your account
            click {emailLink}</p>
        </Col>
      </Row>
    );
  }
}

ConfirmUserAccount.propTypes = {};

ConfirmUserAccount.defaultProps = {};

export default R.compose(
  inject(...stores),
  withRouter,
  observer,
)(ConfirmUserAccount)