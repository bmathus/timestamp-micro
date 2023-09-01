// index.js
// where your node app starts

// init project
var express = require('express');
const path = require('path');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date', (req, res, next) => {
  const dateParam = req.params.date;
  const date = new Date(dateParam);

  if (date.toString() === 'Invalid Date') {
    const unixDate = Number(dateParam);

    if (!isNaN(unixDate)) {
      const dateFromUnix = new Date(unixDate);
      res.json({
        unix: dateFromUnix.getTime(),
        utx: dateFromUnix.toUTCString(),
      });
    } else {
      res.json({
        error: 'Invalid Date',
      });
    }
  } else {
    res.json({
      unix: date.getTime(),
      utx: date.toUTCString(),
    });
  }
});

app.get('/api/', (req, res) => {
  const dateNow = new Date();
  res.json({
    unix: dateNow.getTime(),
    utx: dateNow.toUTCString(),
  });
});

app.use((req, res) => {
  res.status(404);
  res.send('Not found');
});

// listen for requests :)
//v1.2
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;
