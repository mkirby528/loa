const Sequelize = require("sequelize");
const db = require("../config/database");

const AuthorBook = db.define("author_book", {});

module.exports = AuthorBook;
