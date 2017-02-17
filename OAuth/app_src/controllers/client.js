var Client = require('../models/clients');


//register API 
exports.postClients = function(req, res, next){
     
   var client = new Client();

  client.name = req.body.name;
  client._id = req.body._id;
  client.secret = req.body.secret;
  client.userID = req.user._id;
 
    client.save(function (err){
    if(err){ return next(err); }

    return res.json({data: client});
  });
     
};

//login API 
exports.getClients = function(req, res, next){
   
   client.find({userID: req.user._id}, function(err, clients){
    if (err)
      res.send(err);

    res.json(clients);
  });
 };

