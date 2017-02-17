var User = require('../models/users');

exports.postUsers = function(req, res){
    //validate fields
     if (!req.body.username) {
        return res.status(400).send('Username is required');
    }
     else if (!req.body.password) {
        return res.status(400).send('Password is required');
    }
    else if (typeof req.body.password !== 'string') {
        return res.status(400).send('Password must be a string');
    }
 
    if (!req.body.email) {
        return res.status(400).send('Email is required');
    }
    else if (typeof req.body.email !== 'string') {
        return res.status(400).send('Email must be a string');
    }
 
      
   ///create user 
  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  
  user.setPassword(user.password);
     
     user.save(function(err,resp) {
        if(err) {
            console.log(err);
            res.send({
            message :'something went wrong'
            });
        } else {
            res.send({
                message:'User added successfully!'
            });
        }           

    });
};


exports.getUsers = function(req, res, next){
  
    User.find(function(err, users){
           if(err)
            res.send(err);
        
        res.json(users);
        
    });
    
    
  };
  






