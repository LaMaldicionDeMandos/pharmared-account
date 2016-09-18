/**
 * Created by boot on 9/17/16.
 */
var Service = require('../services/user_service');
var service = new Service(db);
var router = require('express').Router();

var getByAccessToken = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find user with accessToken=' + accessToken);
    service.getUserByAccessToken(accessToken)
        .then(user => res.send(user))
        .catch(error => res.sendStatus(401));
};

router.get('/', getByAccessToken);

module.exports = router;