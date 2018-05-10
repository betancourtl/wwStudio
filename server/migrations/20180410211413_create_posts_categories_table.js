exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts_categories', t => {
    t.integer('post_id').unsigned();
    t.foreign('post_id').references('posts.id').onDelete('CASCADE');
    t.integer('category_id').unsigned();
    t.foreign('category_id').references('categories.id');
    t.timestamps(false, true)
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('posts_categories');
};
