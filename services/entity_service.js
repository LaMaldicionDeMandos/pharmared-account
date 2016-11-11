/**
 * Created by boot on 11/10/16.
 */
var q = require('q');
function EntityService(db) {
    this.getEntityById = function(id) {
        var def = q.defer();
        db.Entity.findOne({_id: id}, function(err, entity) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(entity);
            }
        });
        return def.promise;
    };
}

module.exports = EntityService;