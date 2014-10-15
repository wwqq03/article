var express = require('express');
var router = express.Router();
var Articles = require('../db').ARTICLES;

/* GET listing. */
router.get('/', function(req, res) {
  Articles.find(function(err, data) {
        if(err) {
            res.send(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;
