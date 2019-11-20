module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/hn.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
      host: '127.0.0.1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
