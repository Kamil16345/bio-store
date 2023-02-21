const mongoose = require('mongoose')
const config = require('config')

module.exports = function(){
    console.log("BEFORE DB");
    console.log('Config file path:', config.util.getConfigSources());
    console.log("ENV_VARIABLES")
    console.log(process.env);
    const db = config.get('db')
    console.log("HERE IS DB!!!!!"+db)
    //const cleanUpDB = config.cleanUpDB()
    mongoose.connect(db)
    .then(console.log(`Successfully connected to ${db}`))
    .then()
    .catch(err => console.error(`Could not connect to ${db}`, err)
    )
}
