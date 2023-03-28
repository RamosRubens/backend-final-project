require('dotenv').config()
const path = require('path');

module.exports = {
  client: 'mysql2',
  connection: process.env.DB_URL,
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
};
