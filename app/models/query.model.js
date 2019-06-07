var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dartSchema = new Schema({
    userName: String,
    query: String
});
module.exports = mongoose.model('query', dartSchema);   