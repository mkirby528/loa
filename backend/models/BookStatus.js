module.exports = (sequelize, Sequelize) => {
  const BookStatus = sequelize.define(
    "book_status",
    {
      user: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: { model: "users", key: "username" }
      },
      bookKey: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: { model: "books", key: "key" }
      },
      status: Sequelize.ENUM("current", "toRead", "read")
    },
    { freezeTableName: true }
  );
  return BookStatus;
};
