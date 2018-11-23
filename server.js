var express = require('express');
var app = express();
var session    = require('express-session')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'keyboard cat ninja',resave: true, saveUninitialized:true}));





var routes = require('./app/routes/routes.js')(app);



var port = process.env.PORT || 8080
app.listen(port, function(err) {

    if (!err)
        console.log("Site is live at: ",port);
    else console.log(err)

});
