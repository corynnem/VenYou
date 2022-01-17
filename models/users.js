const { DataTypes } = require('sequelize');
const db = require('../db')


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *          - email
 *          - firstName
 *          - lastName
 *          - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a new User
 *         email:
 *           type: string
 *           description: The User's email
 *         firstName:
 *           type: string
 *           description: The User's first name
 *         lastName:
 *           type: string
 *           description: The User's last name
 *         password:
 *           type: string
 *           description: The User's chosen password
 *         actName:
 *           type: string
 *           description: The User's act name
 *       example:
 *         id: 1
 *         email: email@gmail.com
 *         firstName: Jane
 *         lastName: Doe
 *         password: password123
 *         actName: Jane Doe and the Bananas
 */


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