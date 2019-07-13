module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
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
    }
  });
  return Book;
};
