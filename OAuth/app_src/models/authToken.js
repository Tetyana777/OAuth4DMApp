var mongoose = require('mongoose');

var TokenSchema = new mongoose.Schema({
    value: {
        type: String,
        require: true        
    },
    userID:{
        type:String,
        require:true
    }, 
    clientID:{
        type:String,
        require: true    
    }
    
});

module.exports = mongoose.model('Token', TokenSchema);

