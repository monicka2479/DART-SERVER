const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello from server');
})

var mongoose = require('mongoose');

// make a connection
mongoose.connect('mongodb://localhost:27017/dart', { useNewUrlParser: true });

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("Connection Successful!");

  app.post('/enroll', function (req, res) {
    // console.log('Request body output '
    //   + JSON.stringify(req.body));
    try {
      db.collection("tasks").insertMany(req.body);
      console.log("Data inserted successfully");
    } catch (e) {
      console.log(e);
    }
  });
})

app.get('/select', function (req, res) {
  console.log("inside select");
  db.collection("tasks").find({}).toArray(function (err, result) {
    console.log("after select");
    if (err) throw err;
    res.status(200);
    console.log(result);
    res.json(result);
  })
})

db.close();

app.listen(PORT, function () {
  console.log('Server is running in ' +
    'localhost port: ' + PORT);
})