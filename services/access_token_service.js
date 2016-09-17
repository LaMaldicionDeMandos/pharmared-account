/**
 * Created by boot on 9/16/16.
 */
var randtoken = require('rand-token');
var q = require('q');
function AccessTokenService() {
    var generateAccessToken = function() {
        return randtoken.generate(16);
    };

    this.saveAccessToken = function(userId) {
        var token = generateAccessToken();
        var def = q.defer();
        redisClient.multi()
            .set(token, userId)
            .expire(token, config.token_expiration)
            .exec(function(){
                def.resolve(token);
            });
        return def.promise;
    };

    this.getUserIdByToken = function(accessToken) {
        var def = q.defer();
        redisClient.expire(accessToken, config.token_expiration);
        redisClient.get(accessToken, function(userId) {
            def.resolve(userId);
        });
        return def.promise;
    }
}

module.exports = AccessTokenService;
