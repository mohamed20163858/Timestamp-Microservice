// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  const currentDate = new Date();
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
  const formattedDate = currentDate.toGMTString();

  res.json({unix: unixTimestamp, utc: formattedDate});
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  const validDate = Number(date) == date ? Number(date) : date;
  const currentDate = new Date(validDate);
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
  const formattedDate = currentDate.toGMTString();
  const output = formattedDate === "Invalid Date" ?  { error : "Invalid Date" } : {unix: unixTimestamp, utc: formattedDate}
  res.json(output);
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
