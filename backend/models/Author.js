const Sequelize = require("sequelize");
const db = require("../config/database");
const Book = require("./Book");
const AuthorBook = require("./AuthorBook");

const Author = db.define("author", {
  key: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  birth_date: {
    type: Sequelize.STRING
  }
});

Author.belongsToMany(Book, { through: AuthorBook });

module.exports = Author;
