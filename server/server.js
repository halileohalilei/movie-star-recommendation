var express = require('express');
var app = express();

var raccoon = require('raccoon');
raccoon.connect(6379, '127.0.0.1');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/people', function (req, res) {
  var query = req.query;
  var page = query.page;
  var per = query.per;
  var userId = query.userId;

  if (typeof page == 'undefined') page = 0;
  if (typeof per == 'undefined') per = 24;

  raccoon.recommendFor(userId, per, function(results)
  {
    res.send(results);
  });
});

var counter = 0;

app.listen(3000, function () {
  console.log('Started listening on port: 3000');
});

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./movie_star_data.sqlite');

var allConnections;
db.all("SELECT c_user_id, c_star_id from connections", function(err, rows) {
  //rows contain values while errors, well you can figure out.
  allConnections = rows;
  addNewFollow(0);
  // for (var i = 0; i < rows.length; i++) {
    // debugger;
    // var follows = rows[i];
    // console.log(follows['c_user_id'] + " follows " + follows['c_star_id']);
    // res.send(follows);

    // if (i % 1000 == 0)
    //   console.log(i);
  // }
  // console.log('raccoon setup complete');
  // res.send(rows);
});
db.close();

function addNewFollow(row) {
  var follows = allConnections[row];
  raccoon.liked(follows['c_user_id'], follows['c_star_id'], function(){
    // console.log(follows['c_user_id'] + " follows " + follows['c_star_id']);
    if (row < 100)
      addNewFollow(row+1);
  });
}
