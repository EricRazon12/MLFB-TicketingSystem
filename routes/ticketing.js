var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var config = require('../api_config');
var db = config.getMongoDB;

//*** /api/teams
router.get('/search/:keyword', function (req, res, next) {
    db.collection("teams").createIndex({"$**":"text"}, {"weights": { name: 3, nickname:3, "stadium.name": 2, "stadium.location": 2 }});
    db.collection("teams").find({$text: {$search: req.params.keyword}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).toArray(function(err, result){
        res.send(result);
    });

});

module.exports = router;
    