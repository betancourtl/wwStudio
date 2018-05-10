import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import RegisterForm from '../../../components/forms/RegisterForm/index';
import { inject, observer } from "mobx-react/index";

const stores = ['registerForm'];

const Register = props => {
  const form = props.registerForm;
  const email = form.$('email');
  const password = form.$('password');
  const confirmPassword = form.$('confirmPassword');

  return (
    <Row className="register-page">
      <Col xs={5} xsOffset={3}>
        <RegisterForm
          emailInput={email.bind()}
          emailError={email.error}
          emailValidationState={email.hasError ? 'error' : 'success'}

          passwordInput={password.bind()}
          passwordError={password.error}
          passwordValidationState={password.hasError ? 'error' : 'success'}

          confirmPasswordInput={confirmPassword.bind()}
          confirmPasswordError={confirmPassword.error}
          confirmPasswordValidationState={confirmPassword.hasError ? 'error' : 'success'}

          onSubmit={form.onSubmit}
          submitting={form.isSubmitting}
        />
      </Col>
    </Row>
  );
};

Register.propTypes = {};

Register.defaultProps = {};

export default R.compose(
  inject(...stores),
  observer,
)(Register)