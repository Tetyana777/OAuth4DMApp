var oauth2orize = require('oauth2orize');
var User = require('../models/users');
var Client = require('../models/clients');
var Token = require('../models/authToken');
var Code = require('../models/authCode');

var server = oauth2orize.createServer();

 server.serializeClient(function(client, cb) {
  return cb(null, client._id);
});

server.deserializeClient(function(id, cb) {
  Client.findOne({_id:id}, function(err, client) {
    if (err) { return cb(err); }
    return cb(null, client);
  });
});


//client is granted authorization code from the user
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, cb) {
    
   var codeValue = crypto.randomBytes(32).toString('hex');
   
   var code = new Code({
      value: codeValue,
      clientID: client._id,
      redirectURI: redirectURI,
      userID: user._id
  });

   code.save(function(err) {
    if (err) { return cb(err); }
    return cb(null, code.value);
  });
}));

//exchanging auth code for an access token
server.exchange(oauth2orize.exchange.code(function(client, code, redirectURI, cb) {
  Code.findOne({value: code}, function(err, authCode) {
    if (err) { return cb(err); }
    if(authCode === undefined){ return cb(null, false);}
    if (client._id !== authCode.clientID) { return cb(null, false); }
    if (redirectURI !== authCode.redirectURI) { return cb(null, false); }
     
     var tokenValue = crypto.randomBytes(32).toString('hex');
     
      var token = new Token({
      value: tokenValue,
      clientID: authCode.clientID,
       userID: authCode.userID
            });
    
    token.save(function(err) {
      if (err) { return cb(err); }
      return cb(null, token.value);
    });
  });
}));

//user authorization endpoint
//  login.ensureLoggedIn(),
  
  exports.getAuthorization = [
   server.authorize(function(clientID, redirectURI, cb) {
    Client.findOne({id:clientID}, function(err, client) {
      if (err) { return cb(err); }
      if (!client) { return cb(null, false); }
      if (client.redirectURI !== redirectURI) { return cb(null, false); }
      return cb(null, client, client.redirectURI);
    });
  }),
  function(req, res) {
    res.render('oauth2', { transactionID: req.oauth2.transactionID,
                           user: req.user, client: req.oauth2.client });
                   }
    ];
  
  //exchanging for an access token
  exports.postDecision = [
   //login.ensureLoggedIn(),
   server.decision()
   ];
   
  exports.getToken = [
  server.token(),
  server.errorHandler()
  ];
  
  exports.useToken = [
   function(req, res) {
    res.json(req.user);
  }
  ];

   