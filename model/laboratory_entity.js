/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var validateEmpty = require('./model_validations').validateEmpty;
var SCOPE = require('./scope').ELIGIBLE;
var TYPE = require('./entity_type').LABORATORY;
function Laboratory(dto) {
    this.id = dto ? dto._id : undefined;
    this.name = dto ? dto.name : undefined;
    this.phantasy_name = dto ? dto.phantasy_name : undefined;
    this.cuit = dto ? dto.cuit : undefined;
    this.address = dto ? dto.address : undefined;
    this.phone = dto ? dto.phone : undefined;
    this.image = dto ? dto.image : undefined;

    this.scope = SCOPE;
    this.isParent = false;
    this.unique = false;
    this.type = TYPE;

    this.persistable = function(db) {
        var persistable = new db.Entity({
            phantasy_name: this.phantasy_name,
            cuit: this.cuit,
            pharmacist: this.pharmacist,
            enrollment: this.enrollment,
            address: this.address.persistable(db),
            phone: this.phone
        });
        persistable._id = this.id != undefined ? this.id : new db.ObjectId();
        persistable.name = this.name;
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
    }

    this.validate = function() {
        return validateEmpty(this.name) &&
                validateEmpty(this.phantasy_name) &&
                validateEmpty(this.cuit) &&
                this.address != null && this.address.validate();
    }
}

module.exports = Laboratory;