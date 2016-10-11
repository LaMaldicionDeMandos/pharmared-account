/**
 * Created by boot on 10/9/16.
 */
var q = require('q');
var validateEmpty = require('./model_validations').validateEmpty;
var SCOPE = require('./scope').ELIGIBLE;
var TYPE = require('./entity_type').PHARMACIST;
function Pharmacist(dto) {
    this.id = dto ? dto._id : undefined;
    this.first_name = dto ? dto.profile.first_name : undefined;
    this.last_name = dto ? dto.profile.last_name : undefined;
    this.cuit = dto ? dto.cuit : undefined;
    this.enrollment = dto ? dto.enrollment : undefined;
    this.image = dto ? dto.image : undefined;

    this.scope = SCOPE;
    this.isParent = false;
    this.unique = false;
    this.type = TYPE;

    this.persistable = function(db) {
        var persistable = new db.Entity({
            first_name: this.first_name,
            last_name: this.last_name,
            cuit: this.cuit,
            enrollment: this.enrollment
        });
        persistable._id = this.id != undefined ? this.id : new db.ObjectId();
        persistable.name = this.first_name + ' ' + this.last_name;
        persistable.scope = this.scope;
        persistable.isParent = this.isParent;
        persistable.unique = this.unique;
        persistable.image = this.image;
        persistable.type = this.type;
        return persistable;
    };

    this.save = function(db) {
        var def = q.defer();
        var p = this.persistable(db);
        p.save(function(err, pharmacy) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(pharmacy);
            }
        });
        return def.promise;
    };

    this.validate = function() {
        return validateEmpty(this.first_name) &&
            validateEmpty(this.last_name) &&
            validateEmpty(this.cuit) &&
            validateEmpty(this.enrollment);
    };
}

module.exports = Pharmacist;