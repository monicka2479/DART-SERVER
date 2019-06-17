
const express = require('express'),cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
// create express app
const app = express();
date = new Date();
console.log(date.toISOString());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(session({
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));

/* require("./config-success")(app); */
 app.use(flash());

var originsWhitelist = [
    'http://localhost:4200','http://localhost:4201',      //this is my front-end url for development
    'http://localhost:8100','http://www.myproductionurl.com',
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }
  
  //here is the magic
  app.use(cors(corsOptions));

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
});

require('./app/route/dart.route.js')(app);
require('./app/route/query.route.js')(app);
require('./app/route/version.route.js')(app);

// listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening on port "+PORT);
});

const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});