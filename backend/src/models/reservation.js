const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Space = require('./space')
const Client = require('./client')

const Reservation = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  spaceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Space, key: 'id' }
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Client, key: 'id' }
  },
  startDate: { type: DataTypes.DATE, allowNull: false },
  endDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  totalHours: { type: DataTypes.INTEGER, allowNull: false }
})

module.exports = Reservation
