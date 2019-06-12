const Query = require('../models/query.model.js');
var fs=require("fs");

// Create and Save a new Query
exports.create = (req, res) => {

  console.log("inside create data:");
  // Create a Query
  const query = new Query({        
    userName: req.body.userName, 
    query: req.body.query
  });
  // Save Query in the database

  query.save()
  .then(data => {
    req.flash("success", "Query Inserted Succesfully");
    res.send(req.flash('success'));
}).catch(err => {
      console.log('Error');
      res.status(500).send({
         
          message: err.message || "Some error occurred while creating the Query."
      });
  });
};
 exports.select = function(req, res) {
  console.log("Inside select all");
  Query.find({}, function(err, docs) {
      }).then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while selecting the Query."
          });
      });
};