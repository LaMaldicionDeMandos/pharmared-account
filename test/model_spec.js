/**
 * Created by boot on 8/2/16.
 */
var validator = require('../model/model_validations');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var assert = require('assert');
describe('Model', function() {
    describe('Validations', function () {
        describe('Validate empty attribute', function() {
            it('should return false if attribute is null', function() {
                assert.ok(!validator.validateEmpty(null));
            });
            it('should return false if attribute is undefined', function() {
                assert.ok(!validator.validateEmpty());
            });
            it('should return false if attribute is empty string', function() {
                assert.ok(!validator.validateEmpty(''));
            });
            it('should return true if attribute is not an empty string', function() {
                assert.ok(validator.validateEmpty('a'));
            });
        });
        describe('Validate Address', function() {
            it('should return false if street is invalid', function() {
                var address = new Address({number:'1745', city: 'Quilmes Oeste'});
                assert.ok(!address.validate());
            });
            it('should return false if number is invalid', function() {
                var address = new Address({street:'lavalleja', city: 'Quilmes Oeste'});
                assert.ok(!address.validate());
            });
            it('should return false if city is invalid', function() {
                var address = new Address({street:'lavalleja',number:'1745'});
                assert.ok(!address.validate());
            });
            it('should return true if all is correct', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste'});
                assert.ok(address.validate());
            });
        });
        describe('Validate Pharmacy', function() {
            var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste'});
            it('should return false if name is invalid', function() {
                var pharmacy = new Pharmacy({phantasy_name: 'f1', cuit: 'cuit', enrollment: '11', address: address,
                phone:'phone', image: 'image', pharmacist:'juan'});
                assert.ok(!pharmacy.validate());
            });
            it('should return false if phantacy_name is invalid', function() {
                var pharmacy = new Pharmacy({name: 'f1', cuit: 'cuit', enrollment: '11', address: address,
                    phone:'phone', image: 'image', pharmacist:'juan'});
                assert.ok(!pharmacy.validate());
            });
            it('should return false if cuit is invalid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', enrollment: '11', address: address,
                    phone:'phone', image: 'image', pharmacist:'juan'});
                assert.ok(!pharmacy.validate());
            });
            it('should return false if enrollment is invalid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', address: address,
                    phone:'phone', image: 'image', pharmacist:'juan'});
                assert.ok(!pharmacy.validate());
            });
            it('should return false if address is invalid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    phone:'phone', image: 'image', pharmacist:'juan'});
                assert.ok(!pharmacy.validate());
            });
            it('should return false if phsrmscist is invalid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, phone:'phone', image: 'image'});
                assert.ok(!pharmacy.validate());
            });
            it('should return true if all required attributes are valid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                assert.ok(pharmacy.validate());
            });
        });
    });
});