const Sequelize = require("sequelize");
const db = require("../config/database");
const ISBN = require("./ISBN");
const AuthorBook = require("./AuthorBook");
const Author = require("./ISBN");

const Book = db.define("book", {
  key: {
    primaryKey: true,
    unique: true,
    type: Sequelize.STRING
  },
  title: {
    type: Sequelize.STRING,
    notEmpty: true
  },

  cover_image: {
    type: Sequelize.STRING
  },
  publish_year: {
    type: Sequelize.INTEGER
  },
  full_title: {
    type: Sequelize.STRING
  }
});
Book.belongsToMany(Author, { through: AuthorBook });
module.exports = Book;
