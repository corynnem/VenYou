const User = require('./users')
const Manager = require('./manager')
const Venue = require('./venues')


/**
 * @swagger
 * components:
 *   securitySchemes:
 *      ManagerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 *      UserAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       in: header
 */

Manager.hasMany(Venue)
Venue.belongsTo(Manager)


module.exports = {
    User,
    Manager,
    Venue
}