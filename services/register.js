/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var sha = require('sha256');
var passwordGenerator = require('generate-password');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var User = require('../model/user');
function RegisterService(db, mailService) {
    this.existUser = function(user) {
        var def = q.defer();
        db.User.where({email: user.email}).count().exec(function(err, result) {
            def.resolve(result > 0);
        });
        return def.promise;
    };
    this.existPharmacy = function(cuit) {
        var def = q.defer();
        db.Entity.where({cuit: cuit}).count().exec(function(err, result) {
            def.resolve(result > 0);
        });
        return def.promise;
    };
    this.registerPharmacy = function(dto) {
        var defer = q.defer();
        var address = new Address(dto);
        dto.address = address;
        var pharmacy = new Pharmacy(dto);
        pharmacy.id = new db.ObjectId();
        dto.entity = pharmacy;
        dto.role = 'root';
        dto.type = 'root';

        var user = new User(dto);
        user.state = User.State.WAITING;
        user.profile.email = user.email;
        var password = passwordGenerator.generate({length: 8});
        user.password = sha(password);
        if (!pharmacy.validate()) {
            defer.reject('Pharmacy is invalid');
            return defer.promise;
        }
        if (!user.validate()) {
            defer.reject('User is invalid');
            return defer.promise;
        }

        var pharmacyPromise = pharmacy.save(db).then(null, function() {
            defer.reject('Pharmacy is invalid');
        });
        var userPromise = user.save(db).then(null, function() {
            defer.reject('User is invalid');
        });
        q.all([pharmacyPromise, userPromise]).done(function(values) {
            var pharmacy = values[0];
            var user = values[1];
            mailService.sendConfirmationMail(user, password);
            defer.resolve({pharmacy: pharmacy, user: user, password: password});
        });
        return defer.promise;
    };
}

module.exports = RegisterService;