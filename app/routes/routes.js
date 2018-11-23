var authController = require('../controllers/authcontroller.js');
var utils = require("./utils")

module.exports = function(app) {

  app.get('/',utils.checkUser, function(req, res) {

      res.send('Welcome to QA app');

  });
    app.get("/login",function (req, res) {
        res.send(200)
      })
    app.post("/login",authController.login)


    app.get("/signup",function (req, res) {
        res.sendFile(path.join(__dirname, "../react-client/dist/index.html"))
    })
    app.post("/signup",authController.signup)

    app.post("/question",authController.addQuestion)
    app.get("/questions",authController.getAllQuestions)
}
