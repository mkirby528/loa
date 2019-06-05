const Sequelize = require("sequelize");
const Secrets = require("./secrets");

module.exports = new Sequelize(
  Secrets["database"]["db"],
  Secrets["database"]["user"],
  Secrets["database"]["password"],
  {
    host: "localhost",

    dialect: "mysql",
    logging: false,
    // operatorsAliases: false,

    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    }
  }
);
