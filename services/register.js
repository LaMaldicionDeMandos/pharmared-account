/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var validator = require('../model/model_validations');
function RegisterService(db) {
    this.registerPharmacy = function(dto) {
        var address = new Address(dto);
        dto.address = address;
        var pharmacy = new Pharmacy(dto);
        //TODO me falta validar farmacia y usuario
        var user = new User(dto);
    };
}