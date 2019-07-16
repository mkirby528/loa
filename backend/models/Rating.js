module.exports = (sequelize, Sequelize) => {
  const Rating = sequelize.define("rating", {
    rating: Sequelize.DECIMAL(2, 1)
  });
  return Rating;
};
