const Sequelize = require('sequelize');
const config = require('../../config');

if (process.env.MODE === 'production') {
  var dbUrl = process.env.DB_URL;
} else {
  var dbUrl = config;
}
console.log('db url', dbUrl);

const db = new Sequelize(dbUrl, {
    pool: {
      max: 3,
      min: 0,
      idle: 10000
    }
});


module.exports = db;
