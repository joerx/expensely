
exports.up = function(knex, Promise) {
  return knex.schema.createTable('expenses', table => {
    table.uuid('id').primary();
    table.string('item', 100).nullable(false);
    table.float('amount').nullable(false).defaultTo(0.0);
    table.date('date').nullable(false).defaultTo(knex.fn.now());
    table.timestamp('created_at', true).nullable(false).defaultTo(knex.fn.now());
    table.timestamp('updated_at', true).nullable(false).defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('expenses');
};
