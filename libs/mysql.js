const Sequelize = require('sequelize'); 
const db = new Sequelize(
    process.env.MYSQL_DB || 'digital_envision_test', 
    process.env.MYSQL_USER || 'root', 
    process.env.MYSQL_PASS || 'root',
     {
       //contoh     
       host: process.env.MYSQL_HOST || '127.0.0.1',
       dialect: 'mysql'
      }
)
module.exports = db;
