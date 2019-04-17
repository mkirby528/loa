const Sequelize = require('sequelize');
const db = require("../config/database")
const bcrypt = require('bcrypt');


const User = db.define('user',{
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING,
        notEmpty: true,
        unique :true
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
        unique:true
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: true
    }
},{hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }}
)

User.prototype.validPassword =  function(word) {
    return  bcrypt.compareSync(word, this.password);
}



module.exports = User;