/**
 * Created by boot on 9/17/16.
 */
var Service = require('../services/user_service');
var service = new Service(db);
var router = require('express').Router();

var getByAccessToken = function(req, res) {
    var accessToken = req.query.accessToken;
    service.getUserByAccessToken(accessToken).then(user => res.send(user), error => res.status(401).send(err));
};

router.get('/', getByAccessToken);

module.exports = router;