const Sequelize = require('sequelize')

module.exports =  new Sequelize('my-web-app-sql-db', 'root', 'Tennis528!', {
    host: 'localhost',
    dialect: 'mysql',
    // operatorsAliases: false,
    

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });