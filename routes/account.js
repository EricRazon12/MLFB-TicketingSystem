var express = require('express');
var router = express.Router();

var config = require('../api_config');
var db = config.getMongoDB;

router.get('/login', function (req, res, next) {
     if(!req.session.username && !req.session.password){
        res.sendFile(config.loc + '/views/account/login.html');
    }else{
        res.redirect('/account/dashboard/');
    }
});



router.get('/*', function (req, res) {
    if(!req.session.username && !req.session.password){
        res.sendFile(config.loc + '/views/account/login.html');
    }else{
        res.sendFile(config.loc + '/views/administrator/layout.html');
    }
});

router.post('/login', function (req, res, next) {
    var _filter = {
        username: req.body.username,
        pwd: config.encrypt(req.body.password)
    };
        
    db.collection('users').find(_filter).toArray(function(err, result) {
        if (err) throw err;
        if(result.length){
            console.log('logged-in');
            req.session.username = _filter.username;
            req.session.password = _filter.pwd;
            res.redirect('/account/dashboard/');
            // back office
        }else{
            console.log('unknown');
            res.redirect('/account/login?error=invalid user');
            // login page with warning!
        }
    });
});

router.post('/logout', function(req, res){
  req.session.destroy();
  res.status(200).send('ok'); 
});

router.get('/register', function (req, res, next) {
    // db.collection('users').insert({username: 'user1', pwd: config.encrypt('12345')}, function (err, result) {
    //     if (err) throw err;
    //     if (result) console.log(result.insertedIds);
    // });
    
    var owasp = require('owasp-password-strength-test');
    owasp.config({
    allowPassphrases       : true,
    maxLength              : 128,
    minLength              : 10,
    minPhraseLength        : 20,
    minOptionalTestsToPass : 3,
    });
    
    var testResult = owasp.test('12345');
    //console.log(testResult);
    if(testResult.strong){
        console.log('ayos!');
    }else{
        console.log(testResult.errors);
    }
});

module.exports = router;