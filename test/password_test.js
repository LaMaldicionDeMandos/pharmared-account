var generator = require('../services/password_service');
var assert = require('assert');
describe('Password', function() {
    it('should has at least 1 digit', function() {
        for (var i = 0; i < 100; i++) {
            var password = generator();
            var matches = password.match(/([\d])/g);
            assert.ok(matches.length >= 1);
        }
    });
});