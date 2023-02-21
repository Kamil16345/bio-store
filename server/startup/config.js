const config = require('config')

module.exports = function(){
    const jwtPrivateKey = config.get('jwtPrivateKey')
    if(!jwtPrivateKey){
        console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        process.exit(1);
    }
}