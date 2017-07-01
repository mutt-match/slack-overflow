const Sequelize = require('sequelize');
const config = require('../../config.example.js');

if (process.env.MODE === 'production') {
  var dbUrl = process.env.DB_URL;
} else {
  var dbUrl = config.dbUrl;
}

const db = new Sequelize(dbUrl, {
    pool: {
      max: 3,
      min: 0,
      idle: 10000
    }
});


module.exports = db;
