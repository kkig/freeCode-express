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

// Mount middleware to serve static assets
app.use('/public', express.static(__dirname + '/public'));

module.exports = app;
