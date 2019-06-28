const Sequelize = require("sequelize");
const db = require("../config/database");

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
  author1: {
    type: Sequelize.STRING
  },
  author2: {
    type: Sequelize.STRING
  },
  author3: {
    type: Sequelize.STRING
  },
  cover_image: {
    type: Sequelize.STRING
  },
  publish_year: {
    type: Sequelize.INTEGER
  },
  full_title: {
    type: Sequelize.STRING
  },
  isbns: {
    type: Sequelize.BLOB
  }
});

module.exports = Book;
