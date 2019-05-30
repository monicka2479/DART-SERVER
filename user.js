var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,
    taskDate: String,
    FromTime: String,
    ToTime: String,
    PlannedTask: String,
    remarks: String
});
module.exports = mongoose.model('users', userSchema);   