require('dotenv').config();

let express = require('express');
let app = express();

console.log('Hello World');

// app.get('/', function (req, res) {
//   res.send('Hello Express');
// });

app.get('/', function (req, res) {
  // Respond w/ html file
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function (req, res) {
  const resString = 'Hello json';
  let response;

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response = resString.toUpperCase();
  } else {
    response = resString;
  }

  res.json({
    message: response,
  });
});

// Mount middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));

module.exports = app;
