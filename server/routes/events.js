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

router.post('/', function(req, res) {
    var newEvent = req.body;
    if(!newEvent) {
        res.send(400, 'No request body');
        return;
    } else if(!newEvent.name) {
        res.send(400, 'No event name');
        return;
    } else if(!Array.isArray(newEvent.articles)) {
        res.send(400, 'Articles must be array');
        return;
    } else if(newEvent.articles < 2) {
        res.send(400, 'At least 2 articles');
        return;
    }
    var time = Date.now();
    newEvent.createTime = time;
    newEvent.updateTime = time;
    Events.create(newEvent, function(err, doc) {
        if(err) {
            console.log(err);
            res.send(500, 'Error in storing event');
            return;
        }
        res.json(doc);
    });
});

module.exports = router;