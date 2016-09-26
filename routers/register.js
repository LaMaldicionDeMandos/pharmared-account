/**
 * Created by boot on 8/12/16.
 */
var Service = require('../services/register');
var MailService = require('../services/confirmation_email');
var service = new Service(db, new MailService(config));
var router = require('express').Router();

var registerPharmacy = function(req, res) {
    var dto = req.body;
    service.existUser(dto).then(
        function(exist) {
            if (!exist) {
                return service.registerPharmacy(dto);
            } else {
                res.status(400).send('exist_user');
            }
        },
        function(error) {
            res.status(400).send(error);}
    ).then(function (result) {res.status(201).send(result);}, function(error) {
        res.status(400).send(error);});
};

router.post('/pharmacy', registerPharmacy);

module.exports = router;