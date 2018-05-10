const R = require('ramda');
const config = {
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
};

const testConfig = R.omit(['database'])(config);

// Removes the database property
module.exports = process.env.NODE_ENV === 'test' ? testConfig : config;