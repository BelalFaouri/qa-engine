var authController = require('../controllers/authcontroller.js')
var utils = require('./utils')

module.exports = function (app) {
  app.get('/', utils.checkUser, function (req, res) {
    res.send('Welcome to QA app')
  })
  app.get('/login', function (req, res) {
    res.send(200)
  })
  app.post('/login', authController.login)


  app.post('/api/signup', authController.signup)

  app.post('/question', authController.addQuestion)
  app.get('/questions', authController.getAllQuestions)
}
