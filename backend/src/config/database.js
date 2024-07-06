/*const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
})

module.exports = sequelize
*/
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize