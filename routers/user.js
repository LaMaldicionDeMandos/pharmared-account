/**
 * Created by boot on 9/17/16.
 */
var User = require('../model/user');
var Service = require('../services/user_service');
var AccessTokenService = require('../services/access_token_service');
var MailService = require('../services/email_service');
var accessTokenService = new AccessTokenService();
var service = new Service(db);
var router = require('express').Router();

var mailService = new MailService(config);

var verifyInternals = function(req, res, next) {
    if (req.get('Internal') == config.private_key) {
        next();
    } else {
        res.status(401).send();
    }
};

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
        if (user == undefined) {
            throw new Error('login_invalid');
        }
        if (User.State.WAITING == user.state) {
            throw new Error('unactived_user');
        } else {
            return accessTokenService.saveAccessToken(user._id);
        }
    }
    ).then(accessToken => res.status(201).send(accessToken)).catch(error => res.status(400).send(error.message));
};

var retrievePassword = function(req, res) {
    var username = req.params.email;
    service.retrievePassword(username).then(
        function(result) {
            mailService.sendRetrievePassword(result.user, result.password);
            res.status(201).send('ok');
        },
        function() {
            res.status(400).send();
        }
    )
};

var getEntityType = function(req, res) {
    var id = req.params.id;
    service.getEntityByUsername(id).then(function(entity) {
        res.send(entity.type);
    },
    function(err) {
        res.status(400).send(err);
    });
};

var getMyProfile = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find profile with accessToken=' + accessToken);
    service.getProfileByAccessToken(accessToken).then(profile => {
        console.log('found profile: ' + JSON.stringify(profile));
        res.send(profile);
    }).catch(error => res.sendStatus(401));
};

var updateProfile = function(req, res) {
    var accessToken = req.query.accessToken;
    var profile = req.body;
    console.log('update profile with accessToken=' + accessToken + " - profile= " + JSON.stringify(profile));
    service.updateProfile(accessToken, profile).then(profile => {
        console.log('profile updated: ' + JSON.stringify(profile));
        res.send(profile);
    }).catch(error => res.sendStatus(401));
};

var revokeAccessToken = function(req, res) {
    var accessToken = req.params.accessToken;
    accessTokenService.revokeAccessToken(accessToken);
    res.send();
}

router.get('/', getByAccessToken);
router.post('/login', login);
router.post('/retrieve/:email', retrievePassword);
router.get('/internal/:id/entity/type', verifyInternals, getEntityType);
router.get('/profile/me', getMyProfile);
router.put('/profile/me', updateProfile);
router.delete('/accessToken/:accessToken', revokeAccessToken);

module.exports = router;