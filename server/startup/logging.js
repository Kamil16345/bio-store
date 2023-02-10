const winston = require('winston')
require('winston-mongodb')

module.exports = function(){
    winston.add(new winston.transports.File({filename: 'logs.log'}))
    winston.add(new winston.transports.MongoDB({db: 'mongodb+srv://kamilo163:kamilox123@cluster0.nxn87es.mongodb.net/?retryWrites=true&w=majority'}))
}