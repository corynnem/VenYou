const User = require('./users')
const Manager = require('./manager')
const Venue = require('./venues')


Manager.hasMany(Venue)
Venue.belongsTo(Manager)


module.exports = {
    User,
    Manager,
    Venue
}