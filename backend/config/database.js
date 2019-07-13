const Sequelize = require("sequelize");
const Secrets = require("./secrets");
const sequelize = new Sequelize(
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
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("../models/User")(sequelize, Sequelize);
db.Book = require("../models/Book")(sequelize, Sequelize);
db.Author = require("../models/Author")(sequelize, Sequelize);
db.ISBN = require("../models/ISBN")(sequelize, Sequelize);
db.AuthorBook = require("../models/AuthorBook")(sequelize, Sequelize);

//Author Book N:M
db.Author.belongsToMany(db.Book, { through: db.AuthorBook });
db.Book.belongsToMany(db.Author, { through: db.AuthorBook });

//Book ISBN 1:M
db.Book.hasMany(db.ISBN, { foreignKey: "bookKey" });
db.ISBN.belongsTo(db.Book, { foreignKey: "bookKey" });
module.exports = db;
