const Version = require('../models/version.model.js');
var fs = require("fs");

exports.insert = (req, res) => {
  console.log('Request body output '
    + JSON.stringify(req.body));
    const version = new Version({        
      dateChanged: req.body.dateChanged, 
      bugFixed: req.body.bugFixed,
      changes: req.body.changes, 
      versionNo: req.body.versionNo
    });
    version.save(req.body)
      .then(data => {
        req.flash("success", "Version Inserted Succesfully");
        res.send(req.flash('success'));
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
};

