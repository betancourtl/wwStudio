import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import ResetPasswordForm from '../../../components/forms/ResetPasswordForm';

class ForgetPassword extends Component {
  render() {
    const form = this.props.forgetPasswordForm;
    const email = form.$('email');
    return (
      <Row className="forget-password-page">
        <Col xs={5} xsOffset={3}>
          <ResetPasswordForm
            emailInput={email.bind()}
            emailError={email.error}
            emailValidationState={email.hasError ? 'error' : 'success'}

            onSubmit={form.onSubmit}
            submitting={form.isSubmitting}
          />
        </Col>
      </Row>
    );
  }
}

ForgetPassword.propTypes = {};

ForgetPassword.defaultProps = {};

export default R.compose(
  withRouter,
  inject('forgetPasswordForm'),
  observer
)(ForgetPassword);