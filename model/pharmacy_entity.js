/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var validateEmpty = require('./model_validations').validateEmpty;
var SCOPE = require('./scope').ELIGIBLE;
var TYPE = require('./entity_type').PHARMACY;
function Pharmacy(dto) {
    this.id = dto ? dto._id : undefined;
    this.name = dto ? dto.name : undefined;
    this.phantasy_name = dto ? dto.phantasy_name : undefined;
    this.cuit = dto ? dto.cuit : undefined;
    this.pharmacist = dto ? dto.pharmacist : undefined;
    this.enrollment = dto ? dto.enrollment : undefined;
    this.address = dto ? dto.address : undefined;
    this.phone = dto ? dto.phone : undefined;
    this.image = dto ? dto.image : undefined;

    this.scope = SCOPE;
    this.isParent = false;
    this.unique = false;
    this.type = TYPE;

    this.persistable = function(db) {
        var persistable = new db.Entity();
        persistable._id = this.id != undefined ? this.id : new db.ObjectId();
        persistable.name = this.name;
        persistable.scope = this.scope;
        persistable.isParent = this.isParent;
        persistable.unique = this.unique;
        persistable.image = this.image;
        persistable.type = this.type;
        persistable.phantasy_name = this.phantasy_name;
        persistable.cuit = this.cuit;
        persistable.pharmacist = this.pharmacist;
        persistable.enrollment = this.enrollment;
        persistable.address = this.address.persistable(db);
        persistable.phone = this.phone;
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
                validateEmpty(this.enrollment) &&
                validateEmpty(this.pharmacist) &&
                this.address != null && this.address.validate();
    }
}

module.exports = Pharmacy;