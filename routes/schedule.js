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
            var data = [];
            var sat, sun, mon, c=0;
            var datainweek = [];
            var daysinweek = [];
            for(var i=0; i<result.length; i++){
               
                if(new Date(result[i].datetime).getDay() == 6){
                    sat = new Date(new Date(result[i].datetime).setDate(new Date(result[i].datetime).getDate()));
                    sun = new Date(new Date(result[i].datetime).setDate(new Date(result[i].datetime).getDate() + 1));
                    mon = new Date(new Date(result[i].datetime).setDate(new Date(result[i].datetime).getDate() + 2));
                    daysinweek.push(sat);
                    daysinweek.push(sun);
                    daysinweek.push(mon);
                }
                for(var x = 0; x < daysinweek.length; x++){
                        if(daysinweek[x].getDate() == new Date(result[i].datetime).getDate()){
                                if(datainweek.indexOf(result[i]) == -1){
                                    datainweek.push(result[i]);
                                }
                            //console.log(datainweek);
                        }
                        if(x == (daysinweek.length - 1) && daysinweek[2].getDate() == new Date(result[i].datetime).getDate()){
                            data.push(datainweek);
                            datainweek = [];
                            daysinweek = [];
                        }
                }
            }
            
            
            // console.log(data);
             res.send(data);
        }
    });

    
});

module.exports = router;