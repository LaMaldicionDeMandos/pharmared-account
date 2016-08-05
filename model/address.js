/**
 * Created by boot on 8/2/16.
 */
var validateEmpty = require('./model_validations').validateEmpty;
function Address(dto) {
    this.street = dto ? dto.street : undefined;
    this.number = dto ? dto.number : undefined;
    this.city = dto ? dto.city : undefined;

    this.validate = function() {
        return validateEmpty(this.street) &&
        validateEmpty(this.number) &&
        validateEmpty(this.city);
    }

    this.persistable = function(db) {
        return {street: this.street, number: this.number, city: this.city};
    }
}

module.exports = Address;