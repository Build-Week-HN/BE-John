exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();

    table
      .string('username', 128)
      .notNullable()
      .unique();
    table.string('password', 128).notNullable();
    table.text('about');
    table.integer('karma');
    table.timestamp('created');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
