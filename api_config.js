var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'orts20160523'; //'d6F3Efeq';
    


module.exports = {
  getMongoDB: require('mongoskin').db('mongodb://or_people:orpwd@ds023303.mlab.com:23303/ticketing_system'), //'mongodb://10.9.1.133:27017/TicketingSystem'), //
  loc: __dirname,
  encrypt: function(text){
            var cipher = crypto.createCipher(algorithm,password)
            var crypted = cipher.update(text,'utf8','hex')
            crypted += cipher.final('hex');
            return crypted;
          },
  decrypt: function(text){
          var decipher = crypto.createDecipher(algorithm,password)
          var dec = decipher.update(text,'hex','utf8')
          dec += decipher.final('utf8');
          return dec;
        },
  DefaultData: {
    teams: [{ 
                name: 'virginia',
                nickname: 'armada',
                imgurl: '/assets/images/virginia.png',
                stadium:{
                    name: 'virginia stadium',
                    location: 'virginia',
                    capacity: 50000,
                    image: '/assets/images/virginia-stadium.png'
                }
            },
            { 
                name: 'arkansas',
                nickname: 'attack',
                imgurl: 'assets/images/arkansas.png',
                stadium:{
                    name: 'arkansas stadium',
                    location: 'arkansas',
                    capacity: 50000,
                    image: '/assets/images/arkansas-stadium.png'
                }
            },
            { 
                name: 'florida',
                nickname: 'fusion',
                imgurl: '/assets/images/florida.png',
                stadium:{
                    name: 'florida stadium',
                    location: 'florida',
                    capacity: 50000,
                    image: '/assets/images/virginia-stadium.png'
                }
            },
            { 
                name: 'oregon',
                nickname: 'crash',
                imgurl: '/assets/images/oregon.png',
                stadium:{
                    name: 'oregon stadium',
                    location: 'oregon',
                    capacity: 50000,
                    image: '/assets/images/arkansas-stadium.png'
                } 
            },
            { 
                name: 'ohio',
                nickname: 'union',
                imgurl: '/assets/images/ohio.png',
                stadium:{
                    name: 'ohio stadium',
                    location: 'ohio',
                    capacity: 50000,
                    image: '/assets/images/virginia-stadium.png'
                }  
            },
            { 
                name: 'texas',
                nickname: 'independence',
                imgurl: '/assets/images/texas.png',
                stadium:{
                    name: 'texas stadium',
                    location: 'texas',
                    capacity: 50000,
                    image: '/assets/images/arkansas-stadium.png'
                }  
            },
            { 
                name: 'oklahoma',
                nickname: 'nation',
                imgurl: '/assets/images/oklahoma.png',
                stadium:{
                    name: 'oklahoma stadium',
                    location: 'oklahoma',
                    capacity: 50000,
                    image: '/assets/images/virginia-stadium.png'
                }   
            },
            {
                name: 'alabama',
                nickname: 'airborne',
                imgurl: '/assets/images/alabama.png',
                stadium:{
                    name: 'alabama stadium',
                    location: 'alabama',
                    capacity: 50000,
                    image: '/assets/images/arkansas-stadium.png'
                }  
            }],
      schedule: {
                      teams: [
                          { 
                          name: 'oregon',
                          nickname: 'crash',
                          imgurl: '/assets/images/oregon.png' 
                          },
                            { 
                          name: 'florida',
                          nickname: 'fusion',
                          imgurl: '/assets/images/florida.png' 
                          }
                      ],
                      datetime: 'June 01, 2016 08:00',
                      venue: 'wantland stadium',
                      images: '/assets/images/OregonCrash_schedHome.png',
                      
                      
                  }
    
  }
};