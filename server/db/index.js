const Sequelize = require('sequelize');
const dbUrl = require('../../config');

if (process.env.MODE === 'production') {
  let dbUrl = process.env.DB_URL;
} else {
  let dbUrl = config.dbUrl;
}


const db = new Sequelize(dbUrl, {
    pool: {
      max: 3,
      min: 0,
      idle: 10000
    }
});



module.exports = db;