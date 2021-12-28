const { DataTypes } = require('sequelize');
const db = require('../db')

const User = db.define('user', {
    email: {
        type: DataTypes.STRING(175),
        allowNull: false, 
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    actName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;