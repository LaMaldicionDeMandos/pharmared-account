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
                res.status(400).send('exist_user');
            }
        },
        function(error) {
            res.status(400).send(error);}
    ).then(function(exist) {
            if (!exist) {
                return registerClosure(dto);
            } else {
                res.status(400).send(existErrorCode);
            }
        },function(error) {
            res.status(400).send(error);}
    ).then(function (result) {res.status(201).send(result);}, function(error) {
        res.status(400).send(error);});
};

var registerPharmacy = function(req, res) {
    return registerEntity(req, res, service.registerPharmacy, service.existPharmacy, 'cuit', 'exist_pharmacy');
};

var registerPharmacist = function(req, res) {
    return registerEntity(req, res, service.registerPharmacist, service.existPharmacist, 'enrollment',
        'exist_pharmacist');
};

router.post('/pharmacy', registerPharmacy);
router.post('/pharmacist', registerPharmacist);

module.exports = router;