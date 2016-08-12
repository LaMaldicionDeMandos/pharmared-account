/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var User = require('../model/user');
function RegisterService(db) {
    this.registerPharmacy = function(dto) {
        var defer = q.defer();
        var address = new Address(dto);
        dto.address = address;
        var pharmacy = new Pharmacy(dto);
        dto.entity = pharmacy;
        dto.role = 'root';
        dto.type = 'root';
        var user = new User(dto);
        if (!pharmacy.validate()) {
            defer.reject('Pharmacy is invalid');
        }
        if (!user.validate()) {
            defer.reject('User is invalid');
        }

        var pharmacyPromise = pharmacy.save(db).then(null, function() {
            defer.reject('Pharmacy is invalid');
        });
        var userPromise = user.save(db).then(null, function() {
            defer.reject('User is invalid');
        });
        q.all([pharmacyPromise, userPromise]).done(function(values) {
            defer.resolve({pharmacy: pharmacy, user: user});
        });
        return defer.promise;
    };
}

module.exports = RegisterService;