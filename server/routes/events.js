var express = require('express');
var router = express.Router();
var Events = require('../db').EVENTS;

/* GET listing. */
router.get('/', function(req, res) {
    Events.find(function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;