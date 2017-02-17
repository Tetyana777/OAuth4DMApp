var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/users');
var Client = require('../models/clients');
var Token = require('../models/authToken');

//using BasicStrategy to check valid username/password
passport.use(new BasicStrategy(
  function(username, password, cb) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return done(null, false, {
          message: 'User not found'
        }); }
      if (!user.validPassword(password)) { return cb(null, false,{
          message: 'Password is wrong'
        }); }
      return done(null, user);
    });
  }
));
  

//using ClientPasswordStrategy for username/password flow
passport.use(new ClientPasswordStrategy(
  function(clientID, clientSecret, cb) {
    Client.findOne({ clientID: client._id }, function (err, client) {
      if (err) { return cb(err); }
      if (!client) { return cb(null, false); }
      if (client.secret !== clientSecret) { return done(null, false); }
      return cb(null, client);
    });
  }
));

exports.isAuthenticated = passport.authenticate(['basic', 'oauth2-client-password'], { session: false });

//using Bearer strategy for token
passport.use(new BearerStrategy(
  function(token, cb) {
    Token.findOne({ value: token }, function (err, token) {
      if (err) { return cb(err); }
      if (!token) { return cb(null, false); }
      return cb(null, token, { scope: '*' });
    });
    
    User.findOne(token.userID, function (err, user) {
        if (err) { return cb(err); }

        if (!user) { return cb(null, false, {message:'Unknown user!'}); }
        cb(null, user, { scope: '*' });
      });
  }
));
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
