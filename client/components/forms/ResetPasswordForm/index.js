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
        controlId={props.emailInput.id}
        validationState={props.emailValidationState}
      >
        <ControlLabel>E-mail:</ControlLabel>
        <FormControl{...props.emailInput} />
        <FormControl.Feedback />
        <HelpBlock>{props.emailError}</HelpBlock>
      </FormGroup>

      <Button
        type="submit"
        bsStyle="primary"
        disabled={props.submitting}
      >
        Send E-mail
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
