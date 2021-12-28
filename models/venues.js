const { DataTypes } = require('sequelize');
const db = require('../db')

const Venue = db.define('venue', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(175),
        allowNull: false, 
        unique: true
    },
    phoneNum: {
        type: DataTypes.STRING(175),
        allowNull: false, 
        unique: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(2000),
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Venue;