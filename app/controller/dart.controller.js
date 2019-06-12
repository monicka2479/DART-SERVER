const Dart = require('../models/dart.model.js');
var fs = require("fs");

exports.create = (req, res) => {
  console.log('Request body output '
    + JSON.stringify(req.body));
  try {
    Dart.insertMany(req.body)
      .then(data => {
        req.flash("success", "Data Inserted Succesfully");
        res.send(req.flash('success'));
      })
  } catch (e) {
    console.log(e);
  }
};
exports.select = function (req, res) {
  console.log("Inside select all");
  Dart.find({}, function (err, docs) {
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while selecting the Dart."
    });
  });
};

exports.selectSingle = function (req, res) {
  const userName = req.body.userName;
  const taskDate = req.body.taskDate;
  console.log("inside select" +userName,taskDate);
  Dart.findOne({ 'username': userName, 'taskDate': taskDate }, function (err, result) {
  }).then(data => {
    console.log('Database output'
    + JSON.stringify(data));
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while selecting the Dart."
    });
  });
};