var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/edena'; // for local
if(process.env.MLAB_USERNAME_EDENA) { // check if running remotely
    var username = process.env.MLAB_USERNAME_EDENA; // get from environment
    var password = process.env.MLAB_PASSWORD_EDENA;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds259070.mlab.com:59070/heroku_qrc41fks';
}

var mongoose = require("mongoose");
// var instance2 = new Mongoose();
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;