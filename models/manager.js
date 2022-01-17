const { DataTypes } = require('sequelize');
const db = require('../db')



/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
 *       type: object
 *       required:
 *          - email
 *          - firstName
 *          - lastName
 *          - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a new Manager
 *         email:
 *           type: string
 *           description: The Manager's email
 *         firstName:
 *           type: string
 *           description: The Manager's first name
 *         lastName:
 *           type: string
 *           description: The Manager's last name
 *         password:
 *           type: string
 *           description: The Manager's chosen password
 *       example:
 *         id: 1
 *         email: email@gmail.com
 *         firstName: Jane
 *         lastName: Doe
 *         password: password123
 */


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