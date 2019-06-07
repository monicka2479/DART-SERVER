var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dartSchema = new Schema({
    userName: String,
    taskDate: String,
    fromTime: String,
    toTime: String,
    plannedTask: String,
    remarks: String
});
module.exports = mongoose.model('darts', dartSchema);   