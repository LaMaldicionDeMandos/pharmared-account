/**
 * Created by boot on 8/4/16.
 */
var validator = require('./model_validations');
function User(dto) {
    this.id = dto ? dto.id : undefined;
    this.email = dto ? dto.email : undefined;
    this.password = dto ? dto.password : undefined;
    this.type = dto ? dto.type : undefined;
    this.entity = dto ? dto.entity : undefined;
    this.role = dto ? dto.role : undefined;
    this.profile = dto ? dto.profile : undefined;

    this.validate = function() {
        return validator.validateEmpty(this.email) && validator.validateEmail(this.email) &&
            validator.validateEmpty(this.password) && validator.validatePassword(this.password) &&
            validator.validateEmpty(this.type) &&
            this.entity != null && this.entity.validate() &&
            validator.validateEmpty(this.role);
    }
}

module.exports = User;