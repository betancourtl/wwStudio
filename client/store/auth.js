import { action } from 'mobx';
import {
  createUser,
  authenticate,
  authenticateWithToken,
  activateUser,
  sendAccountActivationEmail,
  sendForgetPasswordEmail,
  changeUserPassword,
} from '../api/auth';
import { setToken } from '../api/utils';

class Auth {
  static storeName = 'auth';

  @action.bound changeUserPassword(token, password) {
    return changeUserPassword(token, password);
  }

  @action.bound sendForgetPasswordEmail(email) {
    return sendForgetPasswordEmail(email);
  };

  registerUser = (email, password, confirmPassword) => {
    return createUser({ email, password, confirmPassword })
      .then(({ user, token }) => {
        this.rootStore.session.startSession(user, token);
      });
  };

  loginUser = (email, password) => {
    return authenticate({ email, password })
      .then(({ user, token }) => {
        this.rootStore.session.startSession(user, token);
      });
  };

  authenticateWithToken = token => authenticateWithToken(token);

  activateUser = activationToken => {
    return activateUser(activationToken)
      .then(({ token }) => {
        setToken(token);
      });
  };

  sendAccountActivationEmail = () => {
    const userId = this.rootStore.session.id;

    if (userId) {
      sendAccountActivationEmail(userId);
    } else {
      console.log('Invalid user id');
    }
  };
}

export default Auth;
const storeName = Auth.storeName;

export {
  storeName,
}
