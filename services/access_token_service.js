/**
 * Created by boot on 9/16/16.
 */
var randtoken = require('rand-token');
var q = require('q');
function AccessTokenService() {
    var generateAccessToken = function(userId) {
        var newAccessToken = userId + ':' + randtoken.generate(16);
        console.log('accessToken generated: ' + newAccessToken);
        return newAccessToken;
    };

    this.saveAccessToken = function(userId) {
        var token = generateAccessToken(userId);
        var def = q.defer();
        redisClient.keys(userId + ':*', (err, keys) => {
            console.log('found old accessTokens: ' + keys);
            redisClient.del(keys, cant => console.log('deleted ' + cant + 'keys'));
            redisClient.multi()
                .set(token, userId)
                .expire(token, config.token_expiration)
                .exec(function(){
                    def.resolve(token);
                });
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
    };

    this.revokeAccessToken = function(accessToken) {
        console.log('Revoke access Token: ' + accessToken);
        redisClient.del(accessToken, console.log);
    };
}

module.exports = AccessTokenService;
