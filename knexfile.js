// Update with your config settings.

module.exports = {
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: "./db/migrations"
    },
    useNullAsDefault: true
  },
  development: {
    client: "pg",
    connection: "postgres://localhost/superheroes",
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    },
    useNullAsDefault: true
  }
};
