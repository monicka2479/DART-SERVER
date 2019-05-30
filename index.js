const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

var User = require('./user.js');



app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello from server');
})

app.post('/enroll', function (req, res) {
  console.log('Request body output '
    + JSON.stringify(req.body));

  var mongoose = require('mongoose');

  // make a connection
  mongoose.connect('mongodb://localhost:27017/dart', { useNewUrlParser: true });

  // get reference to database
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function () {
    console.log("Connection Successful!");


    try {
      db.collection("users").insertMany(req.body);
      console.log("Data inserted successfully");
    } catch (e) {
      console.log(e);
    }
  });
})

app.listen(PORT, function () {
  console.log('Server is running in ' +
    'localhost port: ' + PORT);
})