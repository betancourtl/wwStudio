import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap';

const LoginForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <FormGroup
        controlId={props.emailInput.id}
        validationState={props.emailValidationState}
      >
        <ControlLabel>E-mail:</ControlLabel>
        <FormControl{...props.emailInput} />
        <FormControl.Feedback />
        <HelpBlock>{props.emailError}</HelpBlock>
      </FormGroup>

      <FormGroup
        controlId={props.passwordInput.id}
        validationState={props.passwordValidationState}
      >
        <ControlLabel>Password:</ControlLabel>
        <FormControl
          type="text"
          {...props.passwordInput}
        />
        <FormControl.Feedback />
        <HelpBlock>{props.passwordError}</HelpBlock>
      </FormGroup>
      <Button
        type="submit"
        bsStyle="primary"
        disabled={props.submitting}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
