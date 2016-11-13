/**
 * Created by boot on 11/10/16.
 */
var q = require('q');
function EntityService(db) {
    var validateStaticProperty = function(newEntity, oldEntity, property) {
        return newEntity[property] == oldEntity[property] ? null : property;
    }
    var validateStaticType = function(newEntity, oldEntity) {
        return validateStaticProperty(newEntity, oldEntity, 'type');
    };
    var validateStaticUnique = function(newEntity, oldEntity) {
        return validateStaticProperty(newEntity, oldEntity, 'unique');
    };
    var validateStaticIsParent = function(newEntity, oldEntity) {
        return validateStaticProperty(newEntity, oldEntity, 'isParent');
    };
    var validateStaticScope = function(newEntity, oldEntity) {
        return validateStaticProperty(newEntity, oldEntity, 'scope');
    };
    var validators = [validateStaticType, validateStaticUnique, validateStaticIsParent, validateStaticScope];
    var validateStaticProperties = function(newEntity, oldEntity) {
        var errors = [];
        validators.forEach(validator => {
            var validation = validator(newEntity, oldEntity);
            if (validation) {
                errors.push('invalid_' + validation);
            }
        });
        return errors;
    };
    this.getEntityById = function(id) {
        var def = q.defer();
        db.Entity.findOne({_id: id}, function(err, entity) {
            if (err) {
                def.reject(err);
            } else {
                entity.__v = undefined;
                def.resolve(entity);
            }
        });
        return def.promise;
    };
    this.updateEntity = function(entity) {
        var def = q.defer();
        this.getEntityById(entity._id).then(old => {
            var validationErrors = validateStaticProperties(entity, old);
            if (validationErrors.length == 0) {
                old.update(entity, err => {
                    if (err) {
                        def.reject(err);
                    } else {
                        def.resolve(entity);
                    }
                })
            } else {
                def.reject(validationErrors);
            }
        });
        return def.promise;
    };
}

module.exports = EntityService;