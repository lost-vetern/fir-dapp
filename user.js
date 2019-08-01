var mongoose = require('mongoose');
var passportlocal = require('passport-local-mongoose');
var user = new mongoose.Schema({
    username : String,
    password : String
});

user.plugin(passportlocal);
module.exports = mongoose.model('user',user);