const Query = require('../models/query.model.js');
var fs = require("fs");

// Create and Save a new Query
exports.create = (req, res) => {

    console.log("inside create data:");
    // Create a Query
    const query = new Query({
        userName: req.body.userName,
        query: req.body.query,
        date: req.body.date
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
exports.select = function (req, res) {
    console.log("Inside select all");
    Query.find({ $query: {}, $orderby: { date : -1 } }, function (err, docs) {
    }).then(data => {
        if (data.length != 0) {
            res.send(data);
        }
        else (next(new Error('No Record found :-(')))
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while selecting the Query."
        });
    });
};