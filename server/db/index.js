const Sequelize = require('sequelize');
const config = require('../../config');

if (process.env.MODE === 'production') {
  var dbUrl = process.env.DB_URL;
} else {
  var dbUrl = config;
}

const db = new Sequelize(config, {
  pool: {
    max: 3,
    min: 0,
    idle: 10000
  }
});

module.exports = db;
