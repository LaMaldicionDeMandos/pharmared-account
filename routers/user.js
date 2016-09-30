/**
 * Created by boot on 9/17/16.
 */
var Service = require('../services/user_service');
var AccessTokenService = require('../services/access_token_service');
var accessTokenService = new AccessTokenService();
var service = new Service(db);
var router = require('express').Router();

var getByAccessToken = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find user with accessToken=' + accessToken);
    service.getUserByAccessToken(accessToken).then(user => res.send(user)).catch(error => res.sendStatus(401));
};

var login = function(req, res) {
    var form = req.body;
    service.getUserByEmailAndPassword(form.username, form.password).then(user =>
        accessTokenService.saveAccessToken(user._id)
    ).then(accessToken => res.status(201).send(accessToken)).catch(error =>res.sendStatus(401));
};

router.get('/', getByAccessToken);
router.post('/login', login);

module.exports = router;