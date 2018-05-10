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
  }
];

const hooks = {
  onSuccess(form) {
    const email = form.$('email').value;

    // set submitting to true and wait for our async call to finish
    runInAction(() => this._submitting = true);
    this.rootStore.auth.sendForgetPasswordEmail(email)
      .catch(err => {
        // Used to prevent the onBlur event from removing these errors
        setTimeout(() => {
          if (err.email) form.$('email').invalidate(err.email);
        }, 250);
      })
      .finally(() => {
        // set submitting to false the promise has resolved
        runInAction(() => this._submitting = false);
      })
  },
  onError(form) {
    //  I want to handle errors here
    console.log('All form errors', form.errors());
  }
};

class ForgetPasswordForm extends MobxReactForm {
  static storeName = 'forgetPasswordForm';

  constructor() {
    super({ fields }, { plugins, hooks });
    extendObservable(this, { _submitting: false });
  }

  @computed get isSubmitting() {
    return this.submitting || this._submitting;
  }
}

export default ForgetPasswordForm;

const storeName = ForgetPasswordForm.storeName;

export {
  storeName,
}

