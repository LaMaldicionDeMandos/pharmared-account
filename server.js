config = require('./services/config');

var DB = require('./services/database');
db = new DB(config.db_connection);

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send('success!!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


