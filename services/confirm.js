/**
 * Created by boot on 9/13/16.
 */
var q = require('q');
var User = require('../model/user');
function ConfirmationService(db) {
    var findById = id => {
        var def = q.defer();
        db.User.findById(id).exec(function(err, user) {
            if (err || user == null) {
                def.reject(user);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;
    }
    this.confirm = id => {
        return findById(id).then(user => {
            if (user.state == User.State.WAITING) {
                user.state = User.State.EXPIRED;
                user.save(err => {
                    if (err != null) {
                        throw new Error('unknown_error');
                    }
                });
            } else {
                throw new Error('invalid_state');
            }
        });
    };
}

module.exports = ConfirmationService;