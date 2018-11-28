const Sequelize = require('sequelize')
var sequelize = require('../db')
var Question = sequelize.define('question', {

  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  text: {
    type: Sequelize.TEXT
  },

  username: {
    type: Sequelize.STRING
  },

  answer: {
    type: Sequelize.STRING
  },
  answeredBy:{
    type: Sequelize.STRING
  }
})

Question.sync()

module.exports = Question
