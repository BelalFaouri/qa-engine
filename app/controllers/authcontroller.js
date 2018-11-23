const User=require('../models/user')
const Question=require('../models/question')
const bcrypt = require('bcrypt-nodejs')
var session = require("express-session")

var exports = module.exports = {}

exports.signup = function(req, res) {

      if (req.body.username && req.body.password && req.body.email) {

          var username = req.body.username
          var password = req.body.password
          var email = req.body.email
          User.findOne({ where: {username: username} }).then(user => {

            if (!user) {
                bcrypt.hash(password, null, null,function (err, hash) {
                  User.create({ username: username, password: hash, email:email })
                  .then((user)=> console.log(user))

                  req.session.user=user;
                  res.sendStatus(201)
                  console.log("Created new User!")
                })
            } else {
                console.log("User already exists!")
                res.send("User already exists!")
            }})

          }
        }


exports.login=function (req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.username
        var password = req.body.password
        User.findOne({ where: {username: username} }).then(function(user){
          if (!user) {
            console.log("User does not exist!")
          } else {
            bcrypt.compare(password, user.password, function (err, match) {
              if (err) {
                console.log(err)
              }

              if (match) {
                console.log("logged in successfuly")
                req.session.user=user;
                res.send(200)
              } else {
                console.log("Wrong username or password!")
                res.sendStatus(404)
              }
            })
          }
        })

    } else {
        res.send("<script>window.location.href=\"/login\"</script>")
    }
}

exports.addQuestion=function(req, res){
  console.log(req.body);

  const {username }= req.session.user;
  const {text }= req.body;

  Question.create({text:text,username:username}).then((question)=>Question.findAll().then((questions)=>res.json(questions)))


}

exports.getAllQuestions=function(req, res){

  Question.findAll().then((questions)=>res.json(questions))


}
