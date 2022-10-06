// For .env file
require('dotenv').config();

// Body parser for POST request
const bodyParser = require('body-parser');

let express = require('express');
let app = express();

//
// Mount middleware to serve static assets
// app.use() will be executed for all the requests because default path is "/".
app.use('/public', express.static(__dirname + '/public'));

// Get the request method(http verb), the relative route path, and the caller’s ip
app.use(function (req, res, next) {
  let string = req.method + ' ' + req.path + ' - ' + req.ip;
  console.log(string);

  // Call next() when not responding to avoid server being stack
  next();
});

//
// Mount Middleware before using it
app.use(bodyParser.urlencoded({extended: false}));

//
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

//
// Chain middleware and get time
function middleware(req, res, next) {
  req.time = new Date().toString();
  console.log(req.ip);

  // Block the chain
  // if (req.ip === '__YOUR_IP') {
  //   res.send('Block the chain!');
  // } else {
  //   next();
  // }
  next();
}

app.get('/now', middleware, (req, res) => {
  res.send({time: req.time});
});

//
// Route param
app.get('/:word/echo', function (req, res) {
  const word = req.params.word;
  res.send({echo: word});
});

//
// Get data with GET request using Query String Param
// OR
// Get data with POST request
// Chain different verb handlers on the same path route
app
  .route('/name')
  .get(function (req, res) {
    // Get data from Query Param using 'req.query'
    // (ex. https://example.com?first=John&last=Doe)
    const nameStr = req.query.first + ' ' + req.query.last;
    res.send({name: nameStr});
  })
  .post(function (req, res) {
    // Get data from POST req using 'req.body'
    // (Get from payload of req)
    const nameStr = req.body.first + ' ' + req.body.last;
    res.send({name: nameStr});
  });

module.exports = app;
