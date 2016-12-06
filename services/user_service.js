/**
 * Created by boot on 9/17/16.
 */
var q = require('q');
var sha = require('sha256');
var passwordGeneration = require('./password_service');
var AccessTokenService = require('./access_token_service');
var validator = require('../model/model_validations');
var User = require('../model/user');
function UserService(db) {
    var accessTokenService = new AccessTokenService();
    this.getUserById = function(userId) {
        var def = q.defer();
        db.User.findOne({_id: userId}, function(err, user) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;
    };
    this.getUserByEmailAndPassword = function(email, password) {
        var def = q.defer();
        var encodedPassword = sha(password);
        db.User.findOne({email: email, password: encodedPassword}, function(err, user) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;
    };
    this.getUserByEmail = function(email) {
        var def = q.defer();
        db.User.findOne({email: email}, function(err, user) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;
    };
    this.getUserNameByAccessToken = function(accessToken) {
        return accessTokenService.getUserIdByToken(accessToken)
            .then(this.getUserById)
            .then(user => user.email);
    };
    this.getUserByAccessToken = function(accessToken) {
        return accessTokenService.getUserIdByToken(accessToken)
            .then(this.getUserById)
            .then(user => {
            user.password = user.email = undefined;
            return user;
        });
    };
    this.retrievePassword = function(username) {
        return this.getUserByEmail(username).then(
            function(user) {
                var def = q.defer();
                var password = passwordGeneration();
                user.password = sha(password);
                user.update(user, err => {
                    if (err) {
                        console.log(err);
                        def.reject(err);
                    } else {
                        def.resolve({user:user, password: password});
                    }
                });
                return def.promise;
            }
        );
    };
    this.changePassword = function(username, oldPassword, password) {
        var def = q.defer();
        if (!validator.validatePassword(password)) {
            def.reject('invalid_new');
        } else {
            this.getUserByEmail(username).then(user => {
                    if (!validator.validatePasswordToEncripted(oldPassword, user.password)) {
                        def.reject('invalid_old');
                    } else {
                        user.password = sha(password);
                        user.state = User.State.ACTIVE;
                        user.update(user, function(err, result) {
                            console.log(err + ' - ' + result);
                            if (!err) {
                                def.resolve({user:user, password: password});
                            } else {
                                def.reject(err);
                            }
                        });
                    }
                },
                error => def.reject(error)
            );
        }
        return def.promise;
    };
    this.getEntityByUsername = function(username) {
        return this.getUserByEmail(username).then(user => {
            var def = q.defer();
            if (user) {
                db.Entity.findOne({_id:user.entity}, function(err, entity) {
                    if (err) {
                        def.reject(err);
                    }else {
                        def.resolve(entity);
                    }
                });
            } else {
                def.reject();
            }
            return def.promise;
        });
    };
};

module.exports = UserService;
