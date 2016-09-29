/**
 * Created by boot on 9/17/16.
 */
var q = require('q');
var sha = require('sha256');
var AccessTokenService = require('./access_token_service');
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
    this.getUserByAccessToken = function(accessToken) {
        return accessTokenService.getUserIdByToken(accessToken)
            .then(this.getUserById)
            .then(user => {
            user.password = user.email = undefined;
            return user;
        });
    };
};

module.exports = UserService;
