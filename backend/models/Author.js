module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define("author", {
    key: {
      primaryKey: true,
      type: Sequelize.STRING,
      unique: true
    },
    full_name: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    birth_date: {
      type: Sequelize.STRING
    }
  });

  return Author;
};
