import { getToken, onlyOk } from './utils';

export const createUser = (data) => {
  return onlyOk(fetch('/users/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }));
};

export const authenticate = (data) => {
  return onlyOk(fetch('/auth/authenticate', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }));
};

export const authenticateWithToken = () => {
  return fetch('/auth/authenticate-with-token', {
    method: 'POST',
    headers: {
      'Authorization': getToken(),
    }
  })
    .then(res => res.json())
    .catch(err => {
      console.log('error', err);
    });
};

/**
 * Sends a request to activate a user account.
 * @param id
 * @returns {Promise<any>}
 */
export const activateUser = id => {
  return fetch(`/auth/activate-account/${id}`, {
    method: 'PUT',
  })
    .then(res => res.json())
    .catch(err => {
      console.log('error', err);
    });
};

/**
 * Sends a request to activate a user account.
 * @returns {Promise<any>}
 */
export const sendAccountActivationEmail = (id) => {
  return fetch(`/auth/send-activation-email`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())
    .catch(err => {
      console.log('error', err);
    });
};

/**
 * Sends a request to resend the user an e-mail to change his password
 * @returns {Promise<any>}
 */
export const sendForgetPasswordEmail = (email) => {
  return onlyOk(fetch('/auth/send-reset-password-email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  }));
};

/**
 * Sends a request to change a password
 * @returns {Promise<any>}
 */
export const changeUserPassword = (token, password) => {
  return onlyOk(fetch(`/users/edit-password/${token}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  }));
};

