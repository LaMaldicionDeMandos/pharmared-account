config = require('./services/config');

var DB = require('./services/database');
db = new DB(config.db_connection);

var redis = require("redis");
redisClient = redis.createClient(config.redis_port, config.redis_host);

/* Routers */
var register = require('./routers/register');
var confirm = require('./routers/confirm');
var user = require('./routers/user');

var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

var verifyInternals = function(req, res, next) {
  if (req.get('Internal') == config.private_key) {
    next();
  } else {
    res.status(401).send();
  }
};

app.use('/register', register);
app.use('/confirm', confirm);
app.use('/user', user);
app.use('/internal/user', verifyInternals, user);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


