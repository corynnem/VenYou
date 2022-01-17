const { DataTypes } = require('sequelize');
const db = require('../db')


/**
 * @swagger
 * components:
 *   schemas:
 *     Venue:
 *       type: object
 *       required:
 *          - name
 *          - description
 *          - email
 *          - phoneNum
 *          - location
 *          - photo
 *          - website
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of a new Venue
 *         name:
 *           type: string
 *           description: The Venue's name
 *         description:
 *           type: string
 *           description: The Venue's first description
 *         email:
 *           type: string
 *           description: The Venue's last email
 *         phoneNum:
 *           type: string
 *           description: The Venue's phoneNum
 *         location:
 *           type: string
 *           description: The Venue's address
 *         photo:
 *           type: string
 *           description: A photo url of the Venue
 *         website:
 *           type: string
 *           description: The website url of the Venue
 *         managerId: 
 *           type: integer
 *           description: The auto-populated number attached to an account with manager permissions
 * 
 * 
 *       example:
 *         id: 1
 *         name: email@gmail.com
 *         description: Jane
 *         lastName: Doe
 *         password: password123
 *         actName: Jane Doe and the Bananas
 *         managerId: 1
 */

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