/**
 * Created by boot on 7/31/16.
 */
var validateEmpty = require('./model_validations').validateEmpty;
var SCOPE = require('./scope').ELIGIBLE;
var TYPE = require('./entity_type').PHARMACY;
function Pharmacy(dto) {
    this.id = dto ? dto.id : undefined;
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