import { extendObservable, action, runInAction } from 'mobx';
import jwt from 'jsonwebtoken';

class Session {
  static storeName = 'session';

  constructor() {
    extendObservable(this, {
      initialTokenVerification: false,
      authenticated: false,
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      birthday: '',
      phone: '',
      zipCode: '',
      city: '',
      state: '',
      country: '',
      active: false,
    });
  }

  @action.bound startSession(props = {}, token = null) {
    this.id = props.id || '';
    this.firstName = props.firstName || '';
    this.lastName = props.lastName || '';
    this.email = props.email || '';
    this.birthday = props.birthday || '';
    this.phone = props.phone || '';
    this.zipCode = props.zipCode || '';
    this.city = props.city || '';
    this.state = props.state || '';
    this.country = props.country || '';
    this.authenticated = true;
    this.active = props.active;

    localStorage.setItem('token', token);
    console.log('session started');
  };

  @action.bound endSession() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.birthday = '';
    this.phone = '';
    this.zipCode = '';
    this.city = '';
    this.state = '';
    this.country = '';
    this.authenticated = false;
    this.active = false;

    localStorage.setItem('token', null);
    console.log('session ended');
  };

  @action.bound initialTokenVerificationComplete() {
    this.initialTokenVerification = true;
  }

  @action.bound loginIfTokenIsValid() {
    const token = localStorage.getItem('token');
    jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, (error, decoded) => {

        if (!decoded) {
          this.endSession();
          this.initialTokenVerificationComplete();
        } else {
          this.rootStore.auth.authenticateWithToken(token)
            .then(({ user, token }) => {
              this.startSession(user, token);
            })
            .catch(err => {
              if (!decoded) this.endSession();
            })
            .finally(() => {
              runInAction(() => {
                console.log('token verified');
                this.initialTokenVerificationComplete();
              });
            });
        }
      }
    );
  }
}

export default Session;
const storeName = Session.storeName;

export {
  storeName,
}

