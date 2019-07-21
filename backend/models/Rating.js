module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
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
    rating: Sequelize.DECIMAL(2, 1)
  });
  return Rating;
};
