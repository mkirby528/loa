const Sequelize = require('sequelize');
const db = require("../config/database")

const User = db.define('user',{
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING,
        notEmpty: true
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
        notEmpty: true
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: true
    }
}
)
module.exports = User;