exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable("heroes", table => {
      table.increments("id").primary();
      table.string("name");
      table.string("universe");
      table.string("location");
      table.timestamps(true, true);
    }),

    knex.schema.createTable("people", table => {
      table.increments("id").primary();
      table.string("name");
      table.integer("hero_id").unsigned();
      table.foreign("hero_id").references("heroes.id");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable("heroes"),
    knex.schema.dropTable("people")
  ]);
};
