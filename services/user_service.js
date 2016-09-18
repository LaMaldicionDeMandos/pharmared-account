/**
 * Created by boot on 9/17/16.
 */
var q = require('q');
var AccessTokenService = require('./access_token_service');
function UserService(db) {
    var accessTokenService = new AccessTokenService();
    this.getUserById = function(userId) {
        var def = q.defer();
        db.User.findOne({_id: userId}, function(err, user) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(result);
            }
        });
        return def.promise;
    }
    this.getUserByAccessToken = function(accessToken) {
        var def = q.defer();
        return accessTokenService.getUserIdByToken(accessToken)
            .then(this.getUserById)
            .then(user => {
            user.password = null;
            user.email = null;
            return user;
        });
    };
}
