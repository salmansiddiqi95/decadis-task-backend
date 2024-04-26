require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: 'utf8',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations', // Specify the directory for migration files
    },
    seeds: {
      directory: './seeds', // Specify the directory for seed files (optional)
    },
  },

  // Add other environments like 'production', 'staging', etc. if needed
};
