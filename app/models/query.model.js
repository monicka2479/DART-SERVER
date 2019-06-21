var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dartSchema = new Schema({
    userName: String,
    query: String,
    date: String
});
module.exports = mongoose.model('queries', dartSchema);   