// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204
/* app.use(function(req, res, next) {    
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || origin > -1){
         console.log(origin, req.body);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  }); */

app.use(function(req, res, next) {
  var origin = req.headers.origin;
  if (origin)
    console.log(
      "Origin: " + req.headers.origin + "IP: " + req.connection.remoteAddress
    );
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/timestamp/:date_string?", function(req, res) {
  var timeRaw = new Date(req.params.date_string);
  if (timeRaw === "Invalid Date") {
    var result = { unix: null, utc: timeRaw };
  } else {
    var result = { unix: Date.parse(timeRaw), utc: timeRaw.toUTCString() };
  }
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
