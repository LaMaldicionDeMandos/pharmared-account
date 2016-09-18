/**
 * Created by boot on 8/4/16.
 */
var q = require('q');
var validator = require('./model_validations');

function State() {

}

State.WAITING = new State();
State.WAITING.toString = function() { return 'WAITING'};
State.ACTIVE = new State();
State.ACTIVE.toString = function() { return 'ACTIVE'};
State.EXPIRED = new State();
State.EXPIRED.toString = function() { return 'EXPIRED'};

State.parse = function(name) { return State[name];}

function User(dto) {
    this.id = dto ? dto._id : undefined;
    this.email = dto ? dto.email : undefined;
    this.password = dto ? dto.password : undefined;
    this.type = dto ? dto.type : undefined;
    this.entity = dto ? dto.entity : undefined;
    this.role = dto ? dto.role : undefined;
    this.profile = dto ? dto.profile : undefined;
    this.state = dto ? State.parse(dto.state) : undefined;

    this.validate = function() {
        return validator.validateEmpty(this.email) && validator.validateEmail(this.email) &&
            validator.validateEmpty(this.password) && validator.validatePassword(this.password) &&
            validator.validateEmpty(this.type) &&
            this.entity != null &&
            validator.validateEmpty(this.role);
    };

    this.persistable = function(db) {
        var user = new db.User();
        user._id = this.id != undefined ? this.id : new db.ObjectId();
        user.email = this.email;
        user.password = this.password;
        user.type = this.type;
        user.entity = this.entity.id.toString();
        user.role = this.role;
        user.profile = this.profile;
        user.state = this.state.toString();
        return user;
    };

    this.save = function(db) {
        var def = q.defer();
        var user = this.persistable(db);
        user.save(function(err, user) {
            if(err) {
                def.reject(err);
            } else {
                def.resolve(user);
            }
        });
        return def.promise;

    };
}

User.State = State;

module.exports = User;