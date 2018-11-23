    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');
    const Sequelize = require('sequelize');

    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


    mongoose.connect('mongodb://localhost:27017');     // connect to mongoDB database on modulus.io
    const sequelize = new Sequelize('qa', 'monty', 'some_pass', {
      host: 'localhost',
      dialect: 'mysql',

      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },

      // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
      operatorsAliases: false
    });

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    require('./models/Users')

    const Question = sequelize.define('question', {
      text: Sequelize.STRING,
      answer: Sequelize.DATE
    });

    sequelize.sync()

   require('./config/passport');

   // routes ======================================================================

    // api ---------------------------------------------------------------------
    // get all Questions
    app.get('/api/questions', function(req, res) {
        // use mongoose to get all Questions in the database
        Question.find(function(err, questions) {
            if (err)
                res.send(err)

            res.json(questions); // return all Questions in JSON format
        });
    });

    // create Question and send back all Questions after creation
    app.post('/api/questions', function(req, res) {
        // create a Question, information comes from AJAX request from Angular
        Question.create({
            text : req.body.text,
            done : false
        }, function(err, question) {
            if (err)
                res.send(err);

            // get and return all the questions after you create another
            Question.find(function(err, questions) {
                if (err)
                    res.send(err)
                res.json(questions);
            });
        });

    });

    // delete a Question
    app.delete('/api/questions/:question_id', function(req, res) {
        Question.remove({
            _id : req.params.question_id
        }, function(err, question) {
            if (err)
                res.send(err);

            // get and return all the Questions after you create another
            Question.find(function(err, questions) {
                if (err)
                    res.send(err)
                res.json(questions);
            });
        });
    });

    app.listen(8080);
    console.log("App listening on port 8080");
