/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var sha = require('sha256');
var passwordGenerator = require('generate-password');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var Pharmacist = require('../model/pharmacist_entity');
var Laboratory = require('../model/laboratory_entity');
var User = require('../model/user');
function PharmacyResolver() {
    this.createEntity = function(dto) {
        var address = new Address(dto);
        dto.address = address;
        return new Pharmacy(dto);
    };
    this.entityIsInvalid = 'Pharmacy is Invalid';
    this.result = function(pharmacy) {
        return {pharmacy: pharmacy};
    }
};
function LaboratoryResolver() {
    this.createEntity = function(dto) {
        var address = new Address(dto);
        dto.address = address;
        return new Laboratory(dto);
    };
    this.entityIsInvalid = 'Laboratory is Invalid';
    this.result = function(laboratory) {
        return {laboratory: laboratory};
    }
};
function PharmacistResolver() {
    this.createEntity = function(dto) {
        return new Pharmacist(dto);
    };
    this.entityIsInvalid = 'Pharmacist is Invalid';
    this.result = function(pharmacist) {
        return {pharmacist: pharmacist};
    }
};
function registerEntity(dto, closureObject, mailService) {
    var defer = q.defer();
    var entity = closureObject.createEntity(dto);
    entity.id = new db.ObjectId();
    dto.entity = entity;
    dto.role = 'root';
    dto.type = 'root';

    var user = new User(dto);
    user.state = User.State.WAITING;
    user.profile.email = user.email;
    var password = passwordGenerator.generate({length: 8});
    user.password = sha(password);
    if (!entity.validate()) {
        defer.reject(closureObject.entityIsInvalid);
        return defer.promise;
    }
    if (!user.validate()) {
        defer.reject('User is invalid');
        return defer.promise;
    }

    var entityPromise = entity.save(db).then(null, function() {
        defer.reject(closureObject.entityIsInvalid);
    });
    var userPromise = user.save(db).then(null, function() {
        defer.reject('User is invalid');
    });
    q.all([entityPromise, userPromise]).done(function(values) {
        var entity = values[0];
        var user = values[1];
        mailService.sendConfirmationMail(user, password);
        var result = closureObject.result(entity);
        result.user = user;
        result.password = password;
        defer.resolve(result);
    });
    return defer.promise;
};
function RegisterService(db, mailService) {
    this.existUser = function(user) {
        var def = q.defer();
        db.User.where({email: user.email}).count().exec(function(err, result) {
            def.resolve(result > 0);
        });
        return def.promise;
    };
    var existCuit = function(cuit) {
        var def = q.defer();
        db.Entity.where({cuit: cuit}).count().exec(function(err, result) {
            def.resolve(result > 0);
        });
        return def.promise;
    };
    this.existPharmacy = function(cuit) {
        return existCuit(cuit);
    };
    this.existPharmacist = function(enrollment) {
        var def = q.defer();
        db.Entity.where({enrollment: enrollment}).count().exec(function(err, result) {
            def.resolve(result > 0);
        });
        return def.promise;
    };
    this.existLaboratory = function(cuit) {
        return existCuit(cuit);
    };
    this.registerPharmacist = function(dto) {
        return registerEntity(dto, new PharmacistResolver(), mailService);
    };
    this.registerPharmacy = function(dto) {
        return registerEntity(dto, new PharmacyResolver(), mailService);
    };
    this.registerLaboratory = function(dto) {
        return registerEntity(dto, new LaboratoryResolver(), mailService);
    };
}

module.exports = RegisterService;