require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    // connection: 'postgres://jp:cavier@localhost:5432/hn_db',
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

  testing: {
    client: 'pg',
    connection: process.env.TEST_DB_URL,
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },

};
