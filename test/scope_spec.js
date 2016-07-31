/**
 * Created by boot on 7/31/16.
 */
var Scope = require('../model/scope');
var assert = require('assert');
describe('Scope', function() {
    describe('Scope constants', function() {
        it('should has constant GLOBAL', function() {
            assert.equal(Scope.GLOBAL, 'GLOBAL');
        });
        it('should has constant ELIGIBLE', function() {
            assert.equal(Scope.ELIGIBLE, 'ELIGIBLE');
        });
        it('should has constant CAN_BUY', function() {
            assert.equal(Scope.CAN_BUY, 'CAN_BUY');
        });
        it('should has constant NONE', function() {
            assert.equal(Scope.NONE, 'NONE');
        });
    });
});