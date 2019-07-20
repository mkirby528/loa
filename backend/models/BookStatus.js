module.exports = (sequelize, Sequelize) => {
  const BookStatus = sequelize.define(
    "book_status",
    {
      status: Sequelize.STRING
    },
    { freezeTableName: true }
  );
  return BookStatus;
};
