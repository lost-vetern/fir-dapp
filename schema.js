var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    previousHash : String,
    hash : String,
        caseTitle : String,
        firNumber : String,
        officerId : String,
        timeStamp : String,
        location : String,
        complaint : String,
        victims : [String],
        accussed : [{name : String, description : String}],
        witness : [{name : String, address : String}],
        offenseSections : [String] 
     
});

module.exports = mongoose.model('fir', schema);