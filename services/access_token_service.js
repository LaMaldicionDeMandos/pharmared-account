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
        console.log("Getting userid by accessToken");
        var def = q.defer();
        redisClient.get(accessToken, function(err, userId) {
            if (err || !userId) {
                console.log("Error: " + err);
                def.reject(err);
            } else {
                console.log("found userid: " + userId);
                redisClient.expire(accessToken, config.token_expiration);
                def.resolve(userId);
            }
        });
        return def.promise;
    }
}

module.exports = AccessTokenService;
