const Sequelize = require("sequelize");
const db = require("../config/database");
const Book = require("../models/Book");

const ISBN = db.define("isbn", {
  isbn: {
    primaryKey: true,
    type: Sequelize.STRING,
    unique: true
  },
  bookKey: {
    type: Sequelize.STRING,
    references: {
      model: "books", // 'persons' refers to table name
      key: "key" // 'id' refers to column name in persons table
    }
  }
});
module.exports = ISBN;
