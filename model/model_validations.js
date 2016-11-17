/**
 * Created by boot on 8/2/16.
 */
var sha = require('sha256');
var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function validateEmpty(value) {
    return value != undefined && value.length > 0;
}

function validateEmail(value) {
    return reEmail.test(value);
}

function validatePassword(value) {
    return rePassword.test(value);
}
function validatePasswordToEncripted(password, encripted) {
    return sha(password) == encripted;
}

exports.validateEmpty = validateEmpty;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validatePasswordToEncripted = validatePasswordToEncripted;