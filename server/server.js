var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/people', function (req, res) {
  var query = req.query;
  var page = query.page;
  var per = query.per;

  if (typeof page == 'undefined') page = 0;
  if (typeof per == 'undefined') per = 24;

  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('./movie_star_data.sqlite');

  db.all("SELECT * from people limit " + per + " offset " + per * page, function(err, rows) {
    //rows contain values while errors, well you can figure out.
    res.send(rows);
  });
  db.close();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
