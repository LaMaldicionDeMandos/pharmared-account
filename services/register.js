/**
 * Created by boot on 7/31/16.
 */
var q = require('q');
var Address = require('../model/address');
var Pharmacy = require('../model/pharmacy_entity');
var validator = require('../model/model_validations');
function RegisterService(db) {
    var ObjectId = db.ObjectId;
    var Entity = db.Entity;
    var User = db.User;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerPharmacy = function(dto) {
        var address = new Address(dto);
        dto.address = address;
        var pharmacy = new Pharmacy(dto);
        //TODO me falta validar farmacia y usuario
        var user = new User();
    };
}