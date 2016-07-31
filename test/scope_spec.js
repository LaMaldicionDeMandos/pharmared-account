/**
 * Created by boot on 7/31/16.
 */
var Scope = require('../model/scope');
var assert = require('assert');
describe('Scope', function() {
    describe('Scope constants', function() {
        it('should has constant GLOBAL', function() {
            assert.equal(Scope.GLOBAL, 'GLOBAL');
            assert.equal(Scope.GLOBAL.toString(), 'GLOBAL');
        });
        it('should has constant ELIGIBLE', function() {
            assert.equal(Scope.ELIGIBLE, 'ELIGIBLE');
            assert.equal(Scope.ELIGIBLE.toString(), 'ELIGIBLE');
        });
        it('should has constant CAN_BUY', function() {
            assert.equal(Scope.CAN_BUY, 'CAN_BUY');
            assert.equal(Scope.CAN_BUY.toString(), 'CAN_BUY');
        });
        it('should has constant NONE', function() {
            assert.equal(Scope.NONE, 'NONE');
            assert.equal(Scope.NONE.toString(), 'NONE');
        });
    });
    describe('get scope from string', function() {
        it('should get scope from string', function() {
            var scope = Scope["GLOBAL"];
            assert.equal(scope, 'GLOBAL')
        });
        it('should get scope from string from static function', function() {
            var scope = Scope.parse('GLOBAL');
            assert.equal(scope, 'GLOBAL')
        });
    });
});