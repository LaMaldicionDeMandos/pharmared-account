/**
 * Created by boot on 8/12/16.
 */
var Service = require('../services/register');
var MailService = require('../services/confirmation_email');
var service = new Service(db, new MailService(config));
var router = require('express').Router();

var registerEntity = function(req, res, registerClosure, existClosure, existAttribute, existErrorCode) {
    var dto = req.body;
    service.existUser(dto).then(
        function(exist) {
            if (!exist) {
                return existClosure(dto[existAttribute]);
            } else {
                throw new Error('exist_user');
            }
        }
    ).then(function(exist) {
            if (!exist) {
                return registerClosure(dto);
            } else {
                throw new Error(existErrorCode);
            }
        }
    ).then(function (result) {
        res.status(201).send(result);}, function(error) {
        res.status(400).send(error.message);});
};

var registerPharmacy = function(req, res) {
    return registerEntity(req, res, service.registerPharmacy, service.existPharmacy, 'cuit', 'exist_pharmacy');
};

var registerPharmacist = function(req, res) {
    return registerEntity(req, res, service.registerPharmacist, service.existPharmacist, 'enrollment',
        'exist_pharmacist');
};

var registerLaboratory = function(req, res) {
    return registerEntity(req, res, service.registerLaboratory, service.existLaboratory, 'cuit', 'exist_laboratory');
};

router.post('/pharmacy', registerPharmacy);
router.post('/pharmacist', registerPharmacist);
router.post('/laboratory', registerLaboratory);

module.exports = router;