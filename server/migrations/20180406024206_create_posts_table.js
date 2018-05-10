exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', t => {
    // deletes the posts_categories rows
    t.increments('id').primary();
    t.json('content');
    t.string('title');
    t.integer('user_id').unsigned();
    t.foreign('user_id').references('users.id').onDelete('CASCADE');
    t.timestamps(false, true)
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
