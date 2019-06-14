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
  console.log('Request body output '
    + JSON.stringify(req.params));
  const userName = req.params.userName;
  const taskDate = req.params.taskDate;
  console.log("inside select" + userName, taskDate);
  Dart.find({ 'userName': userName, 'taskDate': taskDate }, function (err, result) {
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


exports.update = function (req, res) {
  console.log("working");
  console.log('Request body output '
    + JSON.stringify(req.body));

  var obj;
  for (var key in req.body) {
    obj = req.body[key]
    const newvalues = { userName: obj.userName, taskDate: obj.taskDate, fromTime: obj.fromTime, toTime: obj.toTime }
    const myquery = { $set: { actualTask: obj.actualTask } }

    Dart.updateOne(newvalues, myquery, function (err, result) {
      try {
        console.log("updated");
      }
      catch (e) {
        console.log(e);
      }
    })
  }
  req.flash("success", "Data Updated Succesfully");
  res.send(req.flash('success'));
}