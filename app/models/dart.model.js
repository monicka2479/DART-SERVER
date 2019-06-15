var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dartSchema = new Schema({
    userName: String,
    taskDate: Date,
    fromTime: String,
    toTime: String,
    plannedTask: String,    
    actualTask: String,
    remarks: String
});
module.exports = mongoose.model('darts', dartSchema);   