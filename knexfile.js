const { MIGRATIONS_DIR, SEEDS_DIR } = require('./config/constants');

const config = {
  client: 'mysql',
  connection: {
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    typeCast: function (field, next) {
      if (field.type === 'JSON') {
        return (JSON.parse(field.string()))
      }
      return next()
    }
  },
  migrations: {
    directory: MIGRATIONS_DIR,
  },
  seeds: {
    directory: SEEDS_DIR,
  },
};

module.exports = config;
