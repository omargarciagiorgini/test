const fs = require('fs');
require('dotenv').config();

module.exports = {
  test: {
    database: "test_db",
    dialect: "postgres",
    username: 'omar' || process.env.DB_USER,
    password: 'omar4072' || process.env.DB_PASS,
    port: 5432
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