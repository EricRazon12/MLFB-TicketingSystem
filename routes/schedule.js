var express = require('express');
var router = express.Router();

var config = require('../api_config');
var db = config.getMongoDB;

//*** /api/schedule
router.get('/', function (req, res, next) {
    db.collection('schedule').find({}).sort({datetime: 1}).toArray(function(err, result) {
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
            res.send(result);
        }
    }); 
});

router.post('/add', function (req, res, next) {
    var team1 = JSON.parse(req.query.team1);
    var team2 = JSON.parse(req.query.team2);
    var stadium = JSON.parse(req.query.stadium);
    
     var sched  =  {
            "teams" : [ 
                        {
                            "name" : team1.name,
                            "nickname" : team1.nickname,
                            "imgurl" : team1.imgurl,
                            "stadium" : {
                                "name" : team1.stadium.name,
                                "location" : team1.stadium.location,
                                "capacity" : team1.stadium.capacity,
                                "image" : team1.stadium.image
                            }
                        }, 
                        {
                            "name" : team2.name,
                            "nickname" : team2.nickname,
                            "imgurl" : team2.imgurl,
                            "stadium" : {
                                "name" : team2.stadium.name,
                                "location" : team2.stadium.location,
                                "capacity" : team2.stadium.capacity,
                                "image" : team2.stadium.image
                            }
                        }
                    ],
                    "datetime" :  req.query.date + ' ' + req.query.time,
                    "week": req.query.week,
                    "stadium" : {
                        "name" : stadium.name,
                        "location" : stadium.location,
                        "capacity" : stadium.capacity,
                        "image" : stadium.image
                    }
                };
    
    
     db.collection('schedule').insert(sched, function(err, result){
                if(!err)
                   console.log("error");
                console.log(result);
            })   
    
});

module.exports = router;