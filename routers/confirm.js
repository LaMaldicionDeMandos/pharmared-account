/**
 * Created by boot on 9/13/16.
 */
var router = require('express').Router();
var Service = require('../services/confirm');
var service = new Service(db);
var confirm = function(req, res) {
    var id = req.params.id;
    service.confirm(id).then( () => res.sendStatus(200), () => res.sendStatus(400));
};

router.get('/:id', confirm);

module.exports = router;