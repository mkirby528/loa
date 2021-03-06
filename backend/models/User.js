const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        primaryKey: true,
        type: Sequelize.STRING,
        notEmpty: true,
        unique: true
      },
      firstname: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      lastname: {
        type: Sequelize.STRING,
        notEmpty: true
      },
      email: {
        type: Sequelize.STRING,
        notEmpty: true,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        notEmpty: true
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );

  User.prototype.validPassword = function(word) {
    return bcrypt.compareSync(word, this.password);
  };

  return User;
};
