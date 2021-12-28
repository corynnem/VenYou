const { DataTypes } = require('sequelize');
const db = require('../db')

const Manager = db.define('manager', {
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
    }
});

module.exports = Manager;