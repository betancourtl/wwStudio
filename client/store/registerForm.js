import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { runInAction, extendObservable, computed } from 'mobx';

const plugins = { dvr: validatorjs };

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
    rules: 'required|string|between:5,40|email',
    value: 'webdeveloperpr@gmail.com',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:5,25',
    value: '123qwe!@#QWE',
    type: 'password'
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    placeholder: 'Insert Confirm Password',
    rules: 'required|string|same:password',
    value: '123qwe!@#QWE',
    type: 'password'
  }
];

const hooks = {
  onSuccess(form) {
    const email = form.$('email').value;
    const password = form.$('password').value;
    const confirmPassword = form.$('confirmPassword').value;

    // set submitting to true and wait for our async call to finish
    runInAction(() => this._submitting = true);
    this.rootStore.auth.registerUser(email, password, confirmPassword)
      .catch(err => {

        // Used to prevent the onBlur event from removing these errors
        setTimeout(() => {
          if (err.email) form.$('email').invalidate(err.email);
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

class RegisterForm extends MobxReactForm {
  static storeName = 'registerForm';

  constructor() {
    super({ fields }, { plugins, hooks });
    extendObservable(this, { _submitting: false });
  }

  @computed get isSubmitting() {
    return this.submitting || this._submitting;
  }
}

export default RegisterForm;

const storeName = RegisterForm.storeName;

export {
  storeName,
}

