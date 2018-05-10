const { send, createEmail } = require('../../services/mailgun');
const { HOSTNAME, PORT } = process.env;
const host = [HOSTNAME, PORT].join(':');

const activateAccountEmail = (email = '', token) => {
  return send(createEmail({
    html: `<p>Click <a href="${host}/activate-user/${token}">here</a> to activate your account</p>`,
    subject: 'Activate your account',
    to: email,
  }));
};

const changePasswordEmail = (email, token) => {
  return send(createEmail({
    html: `<p>Click<a href="${host}/reset-password/${token}">here</a> reset your password</p>`,
    subject: 'Reset your password',
    to: email,
  }));
};

const passwordChangedEmail = email => {
  return send(createEmail({
    html: `<p>Your password has been changed. You may log in now with your new password.</p> Click<a href="${host}">here</a> to log in.`,
    subject: 'Your password has been changed',
    to: email,
  }));
};

const test = (req, res) => {
  changePasswordEmail(req.body)
    .then(body => {
      res.send(body)
    })
    .catch(err => {
      res.send(err);
    })
};

module.exports = {
  test,
  activateAccountEmail,
  changePasswordEmail,
  passwordChangedEmail,
};
