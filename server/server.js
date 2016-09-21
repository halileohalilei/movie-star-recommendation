var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/people', function (req, res) {
  var query = req.query;
  var page = query.page;
  var per = query.per;

  var resString = 'Requesting page: ';
  resString = resString + (typeof page != 'undefined' ? page : '0')
  resString = resString + ' per: ' + (typeof per != 'undefined' ? per : '24')

  res.send(resString);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
