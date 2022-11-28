const fs = require('fs');

module.exports = {
  test: {
    username: 'database_dev',
    password: 'database_dev',
    database: 'database_dev',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  development: {
    username: 'omar' || process.env.DB_USER,
    password: 'omar4072' || process.env.DB_PASS,
    database: 'mydb' || process.env.DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
};