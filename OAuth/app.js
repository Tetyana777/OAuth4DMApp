var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var log = require('./libs/log')(module);
var passport = require('passport');
var authCtrl = require('./app_src/config/auth');
var oauth2Ctrl = require('./app_src/controllers/oauth2Server');
var userCtrl = require('./app_src/controllers/user');
var clientCtrl = require('./app_src/controllers/client');


//initializaing Express app
var app = express();

//connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/db');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(cb) {
  log.info("Connection succeeded");
 });
 
 

app.use(bodyParser.urlencoded({
    extended:true
}));

//Passport.js
app.use(passport.initialize());


//defining routes
var router = express.Router();

router.route('/users')
     .post(userCtrl.postUsers)
     .get(authCtrl.isAuthenticated, userCtrl.getUsers);
     
router.route('/clients')
     .post(clientCtrl.postClients)
     .get(authCtrl.isAuthenticated, clientCtrl.getClients);

router.route('/oauth2/authorize')
        .get(authCtrl.isAuthenticated, oauth2Ctrl.getAuthorization)
        .post(oauth2Ctrl.postDecision);

router.route('/oauth2/token')
        .post(authCtrl.isAuthenticated, oauth2Ctrl.getToken);

router.route('/userinfo')
        .get(authCtrl.isBearerAuthenticated, oauth2Ctrl.useToken);

// Registering routes with /api
app.use('/api', router);

//error status
app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});


//port listening
app.listen(8080, function(){
    log.info('Express server listening on port 8080');
});




