var User = require('../models/user')
var Question = require('../models/question')
var bcrypt = require('bcrypt-nodejs')

var exports = module.exports = {}

exports.signup = function (req, res) {
  console.log(req.body);
  if (req.body.username && req.body.password && req.body.email) {
    var { username, password, email } = req.body
    User.findOne({ where: { username: username } }).then(user => {
      if (!user) {
        bcrypt.hash(password, null, null, function (err, hash) {
          User.create({ username: username, password: hash, email: email })
            .then((user) => {console.log(user)
            req.session.user = user
            res.send(200)
            console.log('Created new User!')
          })

        })
      } else {
        console.log('User already exists!')
        res.send(400)
      }
    })
  }
}

exports.login = function (req, res) {
  if (req.body.username && req.body.password) {
    var { username, password } = req.body
    User.findOne({ where: { username: username } }).then(function (user) {
      if (!user) {
        console.log('User does not exist!')
      } else {
        bcrypt.compare(password, user.password, function (err, match) {
          if (err) {
            console.log(err)
          }

          if (match) {
            console.log('logged in successfuly')
            req.session.user = user
            console.log(req.session);
            res.send(200)
          } else {
            console.log('Wrong username or password!')
            res.sendStatus(404)
          }
        })
      }
    })
  } else {
    res.send(400)
  }
}

exports.addQuestion = function (req, res) {
  console.log(req.session)

  const { username } = req.session.user
  const { text } = req.body

  Question.create({ text: text, username: username}).then((question) => Question.findAll().then((questions) => res.json(questions)))
}

exports.getAllQuestions = function (req, res) {
  Question.findAll().then((questions) => res.json(questions))
}
