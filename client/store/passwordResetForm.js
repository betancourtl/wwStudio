import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { runInAction, extendObservable, computed } from 'mobx';
import { changeUserPassword } from "../api/auth";

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25',
    value: '',
    type: 'password'
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    placeholder: 'Insert Confirm Password',
    rules: 'required|string|same:password',
    value: '',
    type: 'password'
  },
  {
    name: 'token',
    label: 'token',
    rules: 'required|string',
    type: 'hidden',
    value: '',
  }
];

const hooks = {
  onSuccess(form) {
    const password = form.$('password').value;
    const token = form.$('token').value;

    // set submitting to true and wait for our async call to finish
    runInAction(() => this._submitting = true);
    this.rootStore.auth.changeUserPassword(token, password)
      .catch(err => {
        // Used to prevent the onBlur event from removing these errors
        setTimeout(() => {
          if (err.password) form.$('password').invalidate(err.password);
          if (err.confirmPassword) form.$('confirmPassword').invalidate(err.confirmPassword);
        }, 250);
      })
      .finally(() => {
        // set submitting to false the promise has resolved
        runInAction(() => this._submitting = false);
      })
  },
  onError(form) {
  }
};

class PasswordResetForm extends MobxReactForm {
  static storeName = 'passwordResetForm';

  constructor() {
    super({ fields }, { plugins, hooks });
    extendObservable(this, { _submitting: false });
  }

  @computed get isSubmitting() {
    return this.submitting || this._submitting;
  }
}

export default PasswordResetForm;

const storeName = PasswordResetForm.storeName;

export {
  storeName,
}

