module.exports = (sequelize, Sequelize) => {
  const AuthorBook = sequelize.define("author_book", {});

  return AuthorBook;
};
