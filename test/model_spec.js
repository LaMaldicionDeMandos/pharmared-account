/**
 * Created by boot on 8/2/16.
 */
var validator = require('../model/model_validations');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var User = require('../model/user');
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
        describe('Validate email', function() {
            it('should return true if email is valid', function() {
                assert.ok(validator.validateEmail('pasutmarcelo@gmail.com'));
            });
            it('should return false if email is invalid', function() {
                assert.ok(!validator.validateEmail('pasutmarcelo@ gmail.com'));
            })
        });
        describe('Validate Password', function() {
            it('less than 8 chars return false', function() {
                assert.ok(!validator.validatePassword('a1a1a1a'));
            });
            it('8 or more chars return false', function() {
                assert.ok(!validator.validatePassword('aaaaaaaa'));
            });
            it('8 or more numbers return false', function() {
                assert.ok(!validator.validatePassword('11111111'));
            });
            it('8 or more alphanumeric return true', function() {
                assert.ok(validator.validatePassword('a1a1a1a1'));
            });
        });
        describe('Validate Address', function() {
            it('should return false if street is invalid', function() {
                var address = new Address({number:'1745', city: 'Quilmes Oeste', province:'ba'});
                assert.ok(!address.validate());
            });
            it('should return false if number is invalid', function() {
                var address = new Address({street:'lavalleja', city: 'Quilmes Oeste', province:'ba'});
                assert.ok(!address.validate());
            });
            it('should return false if city is invalid', function() {
                var address = new Address({street:'lavalleja',number:'1745', province: 'ba'});
                assert.ok(!address.validate());
            });
            it('should return false if province is invalid', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'city'});
                assert.ok(!address.validate());
            });
            it('should return true if all is correct', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                assert.ok(address.validate());
            });
        });
        describe('Validate Pharmacy', function() {
            var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
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
            it('should return false if address is invalid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    phone:'phone', image: 'image', pharmacist:'juan'});
                assert.ok(!pharmacy.validate());
            });
            it('should return true if all required attributes are valid', function() {
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                assert.ok(pharmacy.validate());
            });
        });
        describe('Validate User', function() {
            it('should return true if all required attributes are valid', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@gmail.com', password: 'aaaaaaa1', type: 'root',
                    entity: pharmacy, role: 'root'});
                assert.ok(user.validate());
            });
            it('should return false if email is empty', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({password: 'aaaaaaa1', type: 'root', entity: pharmacy, role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if email is invalid', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@ gmail.com', password: 'aaaaaaa1', type: 'root',
                    entity: pharmacy, role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if password is invalid', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@gmail.com', password: 'aaaaaaa', type: 'root',
                    entity: pharmacy, role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if password is empty', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@gmail.com', type: 'root',
                    entity: pharmacy, role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if root is empty', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@gmail.com', password: 'aaaaaaa1', entity: pharmacy,
                    role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if pharmacy is empty', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@ gmail.com', password: 'aaaaaaa1', type: 'root',
                    role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if pharmacy is invalid', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@ gmail.com', password: 'aaaaaaa1', type: 'root',
                    entity: pharmacy, role: 'root'});
                assert.ok(!user.validate());
            });
            it('should return false if role is empty', function() {
                var address = new Address({street:'lavalleja',number:'1745', city:'Quilmes Oeste', province: 'ba'});
                var pharmacy = new Pharmacy({name: 'name', phantasy_name: 'f1', cuit: 'cuit', enrollment: 'address',
                    address: address, pharmacist:'juan'});
                var user = new User({email: 'pasutmarcelo@ gmail.com', password: 'aaaaaaa1', type: 'root',
                    entity: pharmacy});
                assert.ok(!user.validate());
            });
        });
    });
});