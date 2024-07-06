const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Space = sequelize.define('Space', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.STRING }
})

module.exports = Space
