// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// check req values and origin
/*app.use(function(req, res, next) {
  var origin = req.headers.origin;
  if (origin)
    console.log(
      "Origin: " + req.headers.origin + "IP: " + req.connection.remoteAddress
    );
  next();
});*/

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/timestamp/:date_string?", function(req, res) {
  var param = req.params.date_string;
  var newTime = new Date(param);
  var result;
  var unix1 = new RegExp(/^\d+$/);
  var textUnix = new Date(parseInt(param));
  // Empty parameter
  if (param) {
    // normal date parameter
    if (isNaN(newTime)) {
      if (unix1.test(param) && !isNaN(textUnix)) {
        result = { unix: parseInt(param), utc: textUnix.toUTCString() };
      } else {
        res.status(500).json({"unix": `null`, "utc": `Invalid Date`});
      }
    } else {
      result = { unix: newTime.getTime(), utc: newTime.toUTCString() };
    }
  } else {
    var timeNow = new Date();
    result = { unix: timeNow.getTime(), utc: timeNow.toUTCString() };
  }
  console.log(param, req.body);
  res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
