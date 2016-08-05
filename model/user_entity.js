/**
 * Created by boot on 8/4/16.
 */
var q = require('q');
var validator = require('./model_validations');
function User(dto) {
    this.id = dto ? dto._id : undefined;
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
    };

    this.persistable = function(db) {
        var user = new db.User();
        user._id = this.id != undefined ? this.id : new db.ObjectId();
        user.email = this.email;
        user.password = this.password;
        user.type = this.type;
        user.entity = this.entity.id;
        user.role = this.role;
        user.profile = this.profile;
        return user;
    };

    this.save = function(db) {
        var def = q.defer();
        var user = this.persistable(db);
        user.save(function(err) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;

    }
}

module.exports = User;