const winston = require('winston')
require('winston-mongodb')

module.exports = function(){
    winston.add(new winston.transports.File({filename: 'logs.log'}))
    winston.add(new winston.transports.MongoDB({db: 'mongodb://127.0.0.1/bio-store'}))
}