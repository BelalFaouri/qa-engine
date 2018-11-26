const Sequelize = require('sequelize')
var sequelize = require('../db')
var User = sequelize.define('user', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  username: {
    type: Sequelize.TEXT
  },

  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
User.sync()

module.exports = User
