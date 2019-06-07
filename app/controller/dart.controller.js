const Dart = require('../models/dart.model.js');
var fs=require("fs");

exports.create = (req, res) => {
    console.log('Request body output '
      + JSON.stringify(req.body));
   try {
    Dart.insertMany(req.body);
     console.log("Data inserted successfully");
   } catch (e) {
     console.log(e);
   }
 };
 exports.select = function(req, res) {
    console.log("Inside select all");
    Dart.find({}, function(err, docs) {
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while selecting the Employee."
        });
    });
};