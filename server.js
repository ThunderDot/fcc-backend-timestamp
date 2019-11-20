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

  var testUnixDate = new RegExp(/^\d+$/g);
  var testNormalDate = new RegExp(/(^\d{4}[\-\/]\d{2}[\-\/]\d{2}$)()/g);

  var normalDate = new Date(param);
  var unixDate = new Date(parseInt(param));
  var dateNow = new Date();
  var dateError = { error: normalDate.toUTCString()};

  param
    ? testNormalDate.test(param)
      ? !isNaN(normalDate)
        ? res.json({
            unix: Date.parse(normalDate),
            utc: normalDate.toUTCString()
          })
        : res.json(dateError)
    : testUnixDate.test(param)
      ? res.json({ unix: Date.parse(unixDate), utc: unixDate.toUTCString() })
      : res.json(dateError)
    : res.json({ unix: Date.parse(dateNow), utc: dateNow.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
