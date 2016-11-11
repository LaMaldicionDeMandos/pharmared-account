/**
 * Created by boot on 9/17/16.
 */
var UserService = require('../services/user_service');
var EntityService = require('../services/entity_service');
var userService = new UserService(db);
var entityService = new EntityService(db);
var router = require('express').Router();

var myEntity = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find entity with accessToken=' + accessToken);
    userService.getUserByAccessToken(accessToken)
        .then(user => {
            console.log('found user: ' + JSON.stringify(user));
            return entityService.getEntityById(user.entity);
        })
        .then(entity => {
            res.send(entity);
        })
        .catch(error => res.sendStatus(401));
};

router.get('/me', myEntity);

module.exports = router;