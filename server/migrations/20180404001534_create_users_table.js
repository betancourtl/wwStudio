exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.string('email').unique().notNullable();
    t.string('salt').notNullable();
    t.string('password').notNullable();
    t.string('first_name');
    t.string('last_name');
    t.string('address1');
    t.string('address2');
    t.string('zip');
    t.string('city');
    t.string('state');
    t.string('cell');
    t.string('token'); // used for activating users with an e-mail
    t.bool('active').defaultTo(false); // users are inactive by default.
    t.timestamps(false, true)
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users');
};
