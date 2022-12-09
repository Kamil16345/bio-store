const mongoose = require('mongoose')

module.exports = function(db){
    mongoose.connect('mongodb://127.0.0.1/bio-store')
    .then(console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err)
    )

}