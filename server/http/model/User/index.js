const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { createModel } = require('../utils');
const JWT_SECRET = process.env.JWT_TOKEN_SECRET_KEY;

const shape = {
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  salt: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  state: '',
  cell: '',
  active: false,
  token: null,
};

const create = createModel(shape);

const validate = user => {
  // do some validation
  return {
    valid: true,
    errors: null,
  }
};

const createToken = id => {
  return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '1h' });
};

const saltHashPassword = ({ password, salt = randomString() }) => {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password);

  return { salt, hash: hash.digest('hex') }
};

const randomString = () => crypto.randomBytes(4).toString('hex');

const model = {
  name: 'users',
  create,
  validate,
  saltHashPassword,
  randomString,
  createToken,
};

module.exports = model;
