var express = require('express');
var router = express.Router();

var config = require('../api_config');
var db = config.getMongoDB;

//*** /api/schedule
router.get('/', function (req, res, next) {
    db.collection('schedule').find().toArray(function(err, result) {
        if (err){ 
            res.status(500).send(err.message);
            return;
        }
        if(!result.length){
            var schedule = config.DefaultData.schedule;
            db.collection('schedule').insert(schedule, function(err, result) {
                if (err) throw err;
                res.send(schedule);
            });
        }else{
            console.log(result);
            res.send(result);
        }
    });

    
});

module.exports = router;