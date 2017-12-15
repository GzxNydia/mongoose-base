var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var user = new Schema({
    name: String,
    password: String,
    email : String,
})
var infos = new Schema({
    name : String ,
    age : Number ,
    phone : Number,
    email : String,
    time : String,
    introduce : String
})
exports.user = db.model('users', user);
exports.infos = db.model('infos',infos);