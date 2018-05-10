import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import LoginForm from '../../../components/forms/LoginForm/index';
import { withRouter, Link } from 'react-router-dom';

@inject('loginForm')
@withRouter
@observer
class Login extends Component {
  render() {
    const form = this.props.loginForm;
    const email = form.$('email');
    const password = form.$('password');

    return (
      <Row className="login-page">
        <Col xs={5} xsOffset={3}>
          <LoginForm
            emailInput={email.bind()}
            emailError={email.error}
            emailValidationState={email.hasError ? 'error' : 'success'}

            passwordInput={password.bind()}
            passwordError={password.error}
            passwordValidationState={password.hasError ? 'error' : 'success'}

            onSubmit={form.onSubmit}
            submitting={form.isSubmitting}
          />
          <Link to="/forget-password">
            Forget Password?
          </Link>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
