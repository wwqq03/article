var express = require('express');
var router = express.Router();
var Events = require('../db').EVENTS;

/* GET listing. */
router.get('/', function(req, res) {
    Events.find(function(err, data) {
        if(err) {
            res.writeHead(500, err);
            res.end();
        } else {
            res.json(data);
        }
    });
});

router.post('/', function(req, res) {
    var newEvent = req.body;
    if(!newEvent) {
        res.writeHead(400, 'No request body');
        res.end();
        return;
    } else if(!newEvent.name) {
        res.writeHead(400, 'No event name');
        res.end();
        return;
    } else if(!Array.isArray(newEvent.articles)) {
        res.writeHead(400, 'Articles must be array');
        res.end();
        return;
    } else if(newEvent.articles < 2) {
        res.writeHead(400, 'At least 2 articles');
        res.end();
        return;
    }
    var time = Date.now();
    newEvent.createTime = time;
    newEvent.updateTime = time;
    Events.create(newEvent, function(err, doc) {
        if(err) {
            console.log(err);
            res.writeHead(500, 'Error in storing event');
            res.end();
            return;
        }
        res.json(doc);
    });
});

router.delete('/:id', function(req, res) {
    Events.find({_id: req.params.id}).remove(function(err) {
        if(err) {
            res.writeHead(500, err);
            res.end();
        } else {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end();
        }
    });
})

module.exports = router;