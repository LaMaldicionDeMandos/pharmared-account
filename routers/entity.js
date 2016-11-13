/**
 * Created by boot on 9/17/16.
 */
var UserService = require('../services/user_service');
var EntityService = require('../services/entity_service');
var userService = new UserService(db);
var entityService = new EntityService(db);
var router = require('express').Router();

var validateEntityWithAccessToken = function(req, res, next) {
    var accessToken = req.query.accessToken;
    var entity = req.body;
    userService.getUserByAccessToken(accessToken)
        .then(user => {
            if (entity._id != user.entity) {
                console.log('unauthorized: invalid accessToken');
                throw new Error('unauthorized: invalid accessToken');
            }
            return accessToken;
        })
        .then(() => {
            next();
        })
        .catch(error => res.sendStatus(401));
}

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

var updateMyEntity = function(req, res) {
    var accessToken = req.query.accessToken;
    console.log('find entity with accessToken=' + accessToken);
    var entity = req.body;
    entityService.updateEntity(entity)
        .then(updated => res.send(updated))
        .catch(error => res.status(400).send(error));
};

router.get('/me', myEntity);
router.put('/me', validateEntityWithAccessToken, updateMyEntity);

module.exports = router;