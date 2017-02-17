var winston = require('winston');


module.exports = function(module){
    return getLogger(module.filename);
};

function getLogger(path){
    
    if(path.match(/app.js$/)) {
        return new winston.Logger({
        transports : [
            new winston.transports.Console({
                colorize: true,
                level: 'info',
                timestamp: true
            }),
            
            new (winston.transports.File)({
            filename: 'debug.log',
            level: 'debug'
           })
        ]
    });
     } 
    else {
        return new winston.Logger({transports: []});
    }
   
};



