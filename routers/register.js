/**
 * Created by boot on 8/12/16.
 */
var Service = require('../services/register');
var service = new Service(db);
var router = require('express').Router();

var registerPharmacy = function(req, res) {
    var dto = req.body;
    var promise = service.registerPharmacy(dto);
    promise.then(
        function(request) {
            res.sendStatus(200);
        },
        function() {
            res.sendStatus(400);
        }
    );
};

router.post('/pharmacy', registerPharmacy);

module.exports = router;