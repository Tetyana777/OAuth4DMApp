var mongoose = require('mongoose');
var crypto = require('crypto');
process.env.JWT_SECRET = crypto.randomBytes(20).toString('hex');


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true       
       },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    hash: String,
    salt:String
});

 //using crypto
 UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(128).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1200, 256,'sha1').toString('hex');
    };
    
UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1200, 256, 'sha1').toString('hex');
    return this.hash === hash;
    
};  



module.exports = mongoose.model('User', UserSchema);



