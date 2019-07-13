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
        model: "books", // 'persons' refers to table name
        key: "key" // 'id' refers to column name in persons table
      }
    }
  });
  return ISBN;
};
