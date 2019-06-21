const Dart = require('../models/dart.model.js');
var fs = require("fs");

exports.create = (req, res) => {  
    var dartArray = [];
    for (var i in req.body) {
      dartArray.push(req.body[i])
      const DartObj = new Dart({        
        userName: req.body.userName, 
        taskDate: req.body.taskDate,
        fromTime: req.body.fromTime, 
        toTime: req.body.toTime,
        plannedTask: req.body.plannedTask,
        actualTask: req.body.actualTask, 
        remarks: req.body.remarks
      });
    }

    console.log('Request body output '
    + JSON.stringify(dartArray));
  try {
    Dart.insertMany(dartArray)
      .then(data => {
        req.flash("success", "Data Inserted Succesfully");
        res.send(req.flash('success'));
      })
  } catch (e) {
    console.log("Validation");
    process.exit();
  }
};

exports.select = function (req, res) { 
  console.log("Inside select all");
const userName = req.params.userName;
const fromDate = req.params.fromDate;
const toDate = req.params.toDate;
console.log("inside select : " + userName, fromDate, toDate);
Dart.find({
  'userName': userName,
  'taskDate': {
    $gte: fromDate,
    $lte: toDate
  }
}, function (err, docs) { }).
  then(data => {
    console.log("jnx"+data.length);
   if(data.length!=0){
     // console.log(data) 
      console.log('Database output'
    + JSON.stringify(data));
    res.send(data);
   }
   else( next (new Error('No Record found')) )
  }).catch(err => {
    console.log(err);
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
    console.log("jnx"+data.length);
    if(data.length!=0){
    console.log('Database output'
      + JSON.stringify(data));
    res.send(data);
    }
    else( next (new Error('No Record found :-(')) )
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
    const myquery = { $set: { actualTask: obj.actualTask, remarks: obj.remarks } }

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