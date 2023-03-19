const mongoose = require('mongoose')
const config = require('config')

module.exports = function(){

    const db = config.get('db')
    //const cleanUpDB = config.cleanUpDB()
    mongoose.connect(db)
    .then(console.log(`Successfully connected to ${db}`))
    .then()
    .catch(err => console.error(`Could not connect to ${db}`, err)
    )
}
