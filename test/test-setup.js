const { expect } = require('chai');
const mysql = require('mysql');
const mysqlConfig = require('../server/config/mysql');
const knexfile = require('../knexfile');
const knex = require('knex')(knexfile);

global.expect = expect;

let connection;

before((done) => {
  // start mysql connection
  connection = (mysql.createConnection(mysqlConfig));

  connection.connect((err) => {
    if (err) throw err;
    done();
    console.log('MYSQL connection open');
  });
});

after((done) => {
  connection.end((err) => {
    if (err) throw err;
    done();
    console.log('MYSQL connection closed');
  });
});

beforeEach((done) => {
  // remove the database
  const query1 = `DROP DATABASE IF EXISTS ${process.env.RDS_DB_NAME};`;
  const query2 = `CREATE DATABASE ${process.env.RDS_DB_NAME};`;
  connection.query(query1, (err) => {
    if (err) console.log(err);
    connection.query(query2, (err) => {
      if (err) console.log(err);
      knex.migrate.latest()
        .then((x) => {
          done();
        })
        .catch(err => {
          console.log('Error running migrations');
        })
    });
  });
});