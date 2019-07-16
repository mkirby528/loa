module.exports = (sequelize, Sequelize) => {
  const ISBN = sequelize.define("isbn", {
    isbn: {
      primaryKey: true,
      type: Sequelize.STRING,
      unique: true
    },
    bookKey: {
      type: Sequelize.STRING,
      references: {
        model: "books", // 'books' refers to table name
        key: "key" // 'key' refers to column name in persons table
      }
    }
  });
  return ISBN;
};
