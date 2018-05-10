import React, { Component } from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ChangePasswordForm from '../../../components/forms/ResetPassword/index';
import { inject, observer } from 'mobx-react';

class ResetPassword extends Component {
  componentDidMount() {
    const { token } = this.props.match.params;
    const form = this.props.passwordResetForm;
    form
      .$('token')
      .set('value', token);

    form
      .$('token')
      .validate({ showErrors: true });
  }

  render() {
    const { token: tokenValue } = this.props.match.params;
    const form = this.props.passwordResetForm;
    const password = form.$('password');
    const confirmPassword = form.$('confirmPassword');
    const token = form.$('token');
    console.log('token error', token.error);
    console.log('token value', token.bind().value);
    console.log('token has error', token.hasError);
    return (
      <Row className="register-page">
        <Col xs={5} xsOffset={3}>
          <p>Reset Password:</p>
          <ChangePasswordForm
            passwordInput={password.bind()}
            passwordError={password.error}
            passwordValidationState={password.hasError ? 'error' : 'success'}

            confirmPasswordInput={confirmPassword.bind()}
            confirmPasswordError={confirmPassword.error}
            confirmPasswordValidationState={confirmPassword.hasError ? 'error' : 'success'}

            tokenInput={token.bind()}
            tokenError={token.error}
            tokenValidationState={token.hasError ? 'error' : 'success'}

            onSubmit={form.onSubmit}
            submitting={form.isSubmitting}
          />
        </Col>
      </Row>
    );
  }
}

ResetPassword.propTypes = {};

ResetPassword.defaultProps = {};

const stores = ['passwordResetForm'];

export default R.compose(
  inject(...stores),
  withRouter,
  observer,
)(ResetPassword)
