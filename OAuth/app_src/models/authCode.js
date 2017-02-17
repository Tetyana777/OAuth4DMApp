var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
  value: {
      type:String,
      required: true
  }, 
    redirectURI:{
        type:String,
        require:true
    }, 
    userID: {
     type:String,
    require:true   
    },
    clientID: {
     type:String,
    require:true   
    }
    
});

module.exports = mongoose.model('Code', CodeSchema);
