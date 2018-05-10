import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap';

const ResetPasswordForm = props => {
  return (
    <form onSubmit={props.onSubmit}>
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

      <FormGroup
        controlId={props.confirmPasswordInput.id}
        validationState={props.confirmPasswordValidationState}
      >
        <ControlLabel>Password:</ControlLabel>
        <FormControl
          type="text"
          {...props.confirmPasswordInput}
        />
        <FormControl.Feedback />
        <HelpBlock>{props.confirmPasswordError}</HelpBlock>
      </FormGroup>

      <FormGroup
        controlId={props.tokenInput.id}
        validationState={props.tokenValidationState}
      >
        <FormControl
          type="hidden"
          {...props.tokenInput}
        />
        <HelpBlock>{props.tokenError}</HelpBlock>
      </FormGroup>

      <Button
        type="submit"
        bsStyle="primary"
        disabled={props.submitting}
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
