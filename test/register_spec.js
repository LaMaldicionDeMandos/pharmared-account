/**
 * Created by boot on 8/7/16.
 */
var Register = require('../services/register');
var assert = require('assert');
var shouldFailPharmacy = false;
var shouldFailUser = false;
var db = {
    Entity: function() {
        this.save = function(callback) {
            if (shouldFailPharmacy) {
                callback('error');
            } else {
                callback(null, {_id: 'pharmacy_id'});
            }
        }
    },
    User: function() {
        this.save = function(callback) {
            if (shouldFailUser) {
                callback('error')
            } else {
                callback(null, {_id: 'user_id', state: 'WAITING'});
            }
        }
    },
    ObjectId: function() {
        return 'aa';
    }
};

describe('Register', function() {
    describe('Create a pharmacy', function() {
        describe('Create a valid pharmacy', function() {
            var address = {};
            var dto = {street:'lavalleja',number:'1745', city:'Quilmes Oeste', name: 'name', phantasy_name: 'f1',
                cuit: 'cuit', enrollment: 'address', address: address, pharmacist:'juan',
                email: 'pasutmarcelo@gmail.com', password: 'aaaaaaa1', type: 'root'};
            var register;
            beforeEach(function() {
                register = new Register(db);
            });
            it('should resolve promise', function() {
                return register.registerPharmacy(dto).then(
                    function(result) {
                        assert.ok(result.pharmacy._id == 'pharmacy_id');
                        assert.ok(result.user._id == 'user_id');
                    },
                    function() {
                        assert.fail();
                    }
                );
            });
            it('should create user with WAITING state', function() {
                return register.registerPharmacy(dto).then(
                    function(result) {
                        assert.equal(result.user.state.toString(), 'WAITING');
                        assert.ok(result);
                    },
                    function() {
                        assert.fail();
                    }
                );
            });
        });
        describe('Create a but fail save', function() {
            var address = {};
            var dto = {street:'lavalleja',number:'1745', city:'Quilmes Oeste', name: 'name', phantasy_name: 'f1',
                cuit: 'cuit', enrollment: 'address', address: address, pharmacist:'juan',
                email: 'pasutmarcelo@gmail.com', password: 'aaaaaaa1', type: 'root'};
            var register;
            beforeEach(function() {
                shouldFailPharmacy = true;
                register = new Register(db);
            });
            afterEach(function() {
                shouldFailPharmacy = false;
            });
            it('should reject promise', function() {
                return register.registerPharmacy(dto).then(
                    function() {
                        assert.fail();
                    },
                    function() {
                        assert.ok(true);
                    }
                );
            });
        });
        describe('Create a but fail with invalid address', function() {
            var address = {};
            var dto = {number:'1745', city:'Quilmes Oeste', name: 'name', phantasy_name: 'f1',
                cuit: 'cuit', enrollment: 'address', address: address, pharmacist:'juan',
                email: 'pasutmarcelo@gmail.com', password: 'aaaaaaa1', type: 'root'};
            var register;
            beforeEach(function() {
                register = new Register(db);
            });
            it('should reject promise', function() {
                return register.registerPharmacy(dto).then(
                    function() {
                        assert.fail();
                    },
                    function() {
                        assert.ok(true);
                    }
                );
            });
        });
    });
});