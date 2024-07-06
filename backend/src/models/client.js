const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Client = sequelize.define('Client', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true }
})

module.exports = Client
