// items table

exports.up = function (knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments();

    table.string('by').notNullable();
    table.string('title');
    table.text('text');
    table.string('type');
    table.datetime('created').defaultTo(knex.fn.now());
    table.integer('score');
    table.integer('comment_count');
    table.specificType('comments', 'INT[]');
    table.string('url');
    table.integer('parent');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('items');
};
