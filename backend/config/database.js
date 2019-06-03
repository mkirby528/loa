const Sequelize = require('sequelize')

module.exports =  new Sequelize('betterreads-db', 'root', '052899', {
    host: 'localhost',
    dialect: 'mysql',
    logging :false,
    // operatorsAliases: false,
    

    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000,
    },
  });