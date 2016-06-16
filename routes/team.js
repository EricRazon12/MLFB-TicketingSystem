var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var fs = require('fs');
var busboy = require('connect-busboy');
router.use(busboy()); 

var config = require('../api_config');
var db = config.getMongoDB;

//*** /api/teams
router.get('/', function (req, res, next) {
    
    db.collection('teams').find().toArray(function(err, result) {
        if (err){ 
            res.status(500).send(err.message);
            return;
        }
        if(!result.length){
                var teams = config.DefaultData.teams;
            db.collection('teams').insert(teams, function(err, result) {
                if (err) throw err;
                res.send(teams);
            });
        }else if(result && result.length > 0){
            console.log(result);
            res.status(200).send(result);
        }
    });    
});

//*** /api/teams/stadiums
router.get('/stadiums', function (req, res, next) {
    db.collection('teams').find().toArray(function(err, result) {
        if (err){ 
            res.status(500).send(err.message);
            return;
        }
        var stadiums = [];
        for (var x = 0; x < result.length; x++) {
            result[x].stadium.team = result[x].name + ' ' + result[x].nickname;
            result[x].stadium.teamid = result[x]._id;
            stadiums.push(result[x].stadium);
        } 
        res.status(200).send(stadiums);
    });    
});



//*** /api/teams/add
router.post('/add', function (req, res, next) {
    var loc = config.loc;
    var fstream;
    var _public = "/public";
    var c = 0;
    var logo = "";
    var stadiumImg = "";
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
       
        if(fieldname == "logo"){
            logo = '/assets/images/team-logos/' + filename.replace(/\s+/g, '');
            fstream = fs.createWriteStream(loc + _public + logo);
              
        }else if(fieldname == "stadium"){
            stadiumImg = '/assets/images/team-stadiums/' + filename.replace(/\s+/g, '');
            fstream = fs.createWriteStream(loc + _public + stadiumImg);
        }
        
        file.pipe(fstream);
        fstream.on('close', function () {

        });
        
        fstream.on('finish', function () {
             c = c + 1;
             if(c == 2)
             {
                  var team = {
                        name: req.query.name,
                        nickname: req.query.nickname,
                        imgurl: logo,
                        stadium: {
                                    name: req.query.sname,
                                    location: req.query.slocation,
                                    capacity: req.query.scapacity,
                                    image: stadiumImg
                                }
                            }
                    db.collection('teams').insert(team, function(err, result) {
                        if (err) throw err;
                        //res.send(teams);
                        res.status(200).send(team);
                    });
             }
        })
    });
    
});


//*** /api/teams/update
router.post('/update', function (req, res, next) {
    var loc = config.loc;
    var fstream;
    var _public = "/public";
    var c = 0;
    var logo = "";
    var stadiumImg = "";
    req.pipe(req.busboy);
    var _hasFile = false;
    var _id = new mongo.ObjectID(req.query._id);
        
    req.busboy.on('file', function (fieldname, file, filename) {
        
        _hasFile = true;
        
        console.log("Uploading: " + filename); 
       
        if(fieldname == "logo"){
            logo = '/assets/images/team-logos/' + filename.replace(/\s+/g, '');
            fstream = fs.createWriteStream(loc + _public + logo);
              
        }else if(fieldname == "stadium"){
            stadiumImg = '/assets/images/team-stadiums/' + filename.replace(/\s+/g, '');
            fstream = fs.createWriteStream(loc + _public + stadiumImg);
        }
        
        file.pipe(fstream);
        
        fstream.on('close', function () {
        });
        
        fstream.on('finish', function () {
            var team = {
                name: req.query.name,
                nickname: req.query.nickname,
                "stadium.name": req.query.sname,
                "stadium.location": req.query.slocation,
                "stadium.capacity": req.query.scapacity,
                }
                if(logo) team["imgurl"] = logo;
                if(stadiumImg) team["stadium.image"] = stadiumImg;
            
            db.collection('teams').update({'_id': _id}, {$set: team
                                    }, function(err, result) {
                if (err) throw err;
                //res.send(teams);
                //res.status(200).send(team);
            });
        })
    });
         
 if(!_hasFile) {
            db.collection('teams').update({'_id': _id}, {$set: {name: req.query.name, nickname: req.query.nickname, 
                                                                 "stadium.name": req.query.sname,
                                                                 "stadium.location": req.query.slocation,
                                                                 "stadium.capacity": req.query.scapacity
                                                                }
                                                        }, function(err, result) {
                if (err) throw err;
                //res.send(teams);
                res.status(200).send(result);
            });
    }else{
        res.status(200).send("ok");
    }
    
    
});

//*** /api/teams/delete
router.delete('/delete', function (req, res, next) {
    var _id = new mongo.ObjectID(req.query._id);
    db.collection('teams').remove({'_id': _id}, function (err, result) {
        if(err) throw err;
        console.log(result);
        res.status(200).send(result);
    });   
});

//*** /api/teams/[parameter]
router.get('/:_id', function (req, res, next) {
    var _id = new mongo.ObjectID(req.params._id);
    if(req.query.isadmin == 'true'){
        if(req.session.username && req.session.password){
            db.collection('teams').find({'_id': _id}).toArray(function(err, result) {
                if (err){ 
                    res.status(500).send(err.message);
                    return;
                }
                if(result && result.length > 0){
                    console.log(result);
                    res.status(200).send(result[0]);
                }
            });   
        }else{
            res.status(404).send('Unauthorized');
        }
    }else{
        db.collection('teams').find({'_id': _id}).toArray(function(err, result) {
                if (err){ 
                    res.status(500).send(err.message);
                    return;
                }
                if(result && result.length > 0){
                    console.log(result);
                    res.status(200).send(result[0]);
                }
            });
    } 
});



module.exports = router;