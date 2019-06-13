const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Versionhistory = new Schema({
  dateChanged: {
    type: String
  },
  bugFixed: {
    type: String
  },
  changes: {
    type: String
  },
  versionNo: {
    type: String
  }
}, {
    collection: 'versionhistory'
  });

module.exports = mongoose.model('Versionhistory', Versionhistory);