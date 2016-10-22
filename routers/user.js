/**
 * Created by boot on 9/17/16.
 */
var User = require('../model/user');
var Service = require('../services/user_service');
var AccessTokenService = require('../services/access_token_service');
var accessTokenService = new AccessTokenService();
var service = new Service(db);
var router = require('express').Router();

var getByAccessToken = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find user with accessToken=' + accessToken);
    service.getUserByAccessToken(accessToken).then(user => {
        console.log('found user: ' + JSON.stringify(user));
        res.send(user)
    }).catch(error => res.sendStatus(401));
};

var login = function(req, res) {
    var form = req.body;
    service.getUserByEmailAndPassword(form.username, form.password).then(user => {
        if (User.State.WAITING == user.state) {
            throw new Error('unactived_user');
        } else {
            return accessTokenService.saveAccessToken(user._id);
        }
    }
    ).then(accessToken => res.status(201).send(accessToken)).catch(error => res.status(400).send(error.message));
};

router.get('/', getByAccessToken);
router.post('/login', login);

module.exports = router;