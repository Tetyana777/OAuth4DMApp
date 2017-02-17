var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    //client (third-party app that asks for permission (name, id)
    name:{
        type:String,
        required: true,
        unique: true
    },
    id:{
      type:String,
      required: true
    },
    //clien secret should be kept confidentially
    secret:{
        type:String,
        required: true
    },
    //user that owns the application
    userID: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('Client', ClientSchema);

//hashing id and secret+ 
//auto generating the client id and secret in order to enforce uniqueness, randomness, and strength.