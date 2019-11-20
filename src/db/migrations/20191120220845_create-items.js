// items table

exports.up = function (knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments();

    table.string('by');
    table.string('title');
    table.text('text');
    table.string('type');
    table.timestamp('created').defaultTo(knex.fn.now());
    table.integer('score');
    table.integer('comment_count');
    table.specificType('comments', 'INT[]');
    table.string('url');
    table.integer('parent');
    table.integer('user_id').unsigned()
      .notNullable();
    table.foreign('user_id').references('id').inTable('users')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('items');
};
