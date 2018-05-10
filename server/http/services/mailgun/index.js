const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});
const { RouteError } = require('../../errors');
const { mergeMatchingProps } = require('../../../utils');

const createEmail = payload => mergeMatchingProps({
  from: 'Excited User <webdeveloperpr@gmail.com>',
  to: 'webdeveloperpr@gmail.com',
  subject: 'Test E-mail',
  text: 'Testing some Mailgun awesomeness!',
  html: '',
  'o:testmode': process.env.NODE_ENV === 'test', // prevents sending real emails
}, payload);

const send = data => new Promise((resolve, reject) => {
  // We resolve the promise because e-mails sent in test-mode count
  // towards out e-mail limit :(
  if (process.env.NODE_ENV === 'test') {
    return resolve();
  }

  const payload = createEmail(data);
  mailgun
    .messages()
    .send(payload, (error, body) => {
      return error
        ? reject(new RouteError({ email: 'Error sending e-mail' }))
        : resolve(body);
    });
});

module.exports = {
  send,
  createEmail,
};
