const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const Companies = require('../models/Companies');
const Pushtokens = require('../models/Pushtokens');
const sdk = require('api');
const cheerio = require('cheerio');
const scraperapiClient = require('scraperapi-sdk')('d9e600fc58fcacdbccc251fb5929bfbe');
const BSON = require('bson');

const Long = BSON.Long;
const sgMail = require('@sendgrid/mail') 
const postmark = require("postmark");
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');
const res = require('express/lib/response');
const Inbox = require('../models/Inbox');
const Rates = require('../models/Rates');
const Favorites = require('../models/Favorites');
const Gallerij = require('../models/Gallerij');




const router = express.Router();


router.post('/favorites', async (req,res) => {

    const tokenCheck = await Favorites.count({companyid: req.body.companyid, usertoken: req.body.usertoken});
    const extracttokenCount = tokenCheck;
    
    if(extracttokenCount == 0){

        const post2 = new Favorites({
            rating: req.body.rating,
            favorite: req.body.favorite,
            companyid: req.body.companyid,
            usertoken: req.body.usertoken,
            companynaam: req.body.companynaam,
            stad: req.body.stad,
            picture: req.body.picture
            });
            
            post2.save()
            .then(data => {
            res.json(data);
            console.log('saved');  
        
        })
        .catch(err => { 
            res.json({ message: err });
            });

    }else{
        res.json('User engagement and company already in engament db!');
        console.log('User engagement and company already in engament db');  
    }
    

}); //end request

router.get('/checkfavorite/:usertok/:companyname', async (req,res) => {
    try{
const updatedPost = await Favorites.count({usertoken: req.params.usertok, companynaam: req.params.companyname});
const extracttokenCount = updatedPost;

if(extracttokenCount == 1){
res.json(true);
await Favorites.findOneAndRemove({usertoken: req.params.usertok, companynaam: req.params.companyname})

} else {
    res.json(false);  
}

} catch (err) {
    res.json({ message: err});

}
    });

    //
    router.get('/favoritelist/:usertok', async (req,res) => {
        try{
    const updatedPost = await Favorites.find({usertoken: req.params.usertok});

    res.json(updatedPost);
    
    } catch (err) {
        res.json({ message: err});
    
    }
        });

router.post('/rates', async (req,res) => {

    const tokenCheck = await Rates.count({companyid: req.body.companyid, usertoken: req.body.usertoken});
    const extracttokenCount = tokenCheck;
    
    if(extracttokenCount == 0){

        const post2 = new Rates({
            rating: req.body.rating,
            favorite: req.body.favorite,
            companyid: req.body.companyid,
            usertoken: req.body.usertoken,
            companynaam: req.body.companynaam
            });
            
            post2.save()
            .then(data => {
            res.json(data);
            console.log('saved');  
        
        })
        .catch(err => { 
            res.json({ message: err });
            });

    }else{
        res.json('User engagement and company already in engament db');
        console.log('User engagement and company already in engament db');  
    }
    

}); //end request




router.post('/inboxpost', async (req,res) => {

    const tokenCheck = await Inbox.count({dbname: req.body.dbname});
    const extracttokenCount = tokenCheck;
    
    if(extracttokenCount == 0){

        const post2 = new Inbox({
            pushtoken: req.body.pushtoken,
            lastsentence: req.body.lastsentence,
            user: req.body.user,
            ondernemer: req.body.ondernemer,
            dbname: req.body.dbname,
            naambedrijf: req.body.naambedrijf,
            naamuser: req.body.naamuser,
            datum: Date()
            });
            
            post2.save()
            .then(data => {
            res.json(data);
            console.log('Inbox');  
        
        })
        .catch(err => { 
            res.json({ message: err });
            });

    }else{
        res.json('User and company already in inbox db');
        console.log('User and company already in inbox db');  
    }
    

}); //end request

router.get('/inboxget/:user', async (req,res) => {
    try{
const updatedPost = await Inbox.find({ondernemer: req.params.user});
res.json(updatedPost);
} catch (err) {
    res.json({ message: err});

}
    });

    router.get('/inboxuser/:user', async (req,res) => {
        try{
    const updatedPost = await Inbox.find({user: req.params.user});
    res.json(updatedPost);
    } catch (err) {
        res.json({ message: err});
    
    }
        });

router.get('/companies', async (req,res) => {
    try{
const updatedPost = await Companies.find();
res.json(updatedPost);
} catch (err) {
    res.json({ message: err});

}
    });

    router.get('/gallerij', async (req,res) => {
        try{
    const updatedPost = await Gallerij.find();
    res.json(updatedPost);
    } catch (err) {
        res.json({ message: err});
    
    }
        });
    
    router.get('/searchfyxed/:search/:stad', async (req, res) => {
        try {
            const searchnow = req.params.search;
            const searchstad = req.params.stad;  
            
               

            if(searchnow == "Search"){
               
                const allPosts = await Companies.find({Stad:searchstad});;
                res.json(allPosts);
                console.log('het werkt! ' + allPosts)
                }else{
                    const posts = await Companies.find({Bedrijfstype: {$regex:searchnow,$options: 'i'}, Stad:searchstad});;
                    res.json(posts);
                    console.log('het werkt 2 ' + posts)
                   
                }
            
    
             } catch (err) {
              res.json({ message: err });
                  }
    });    


    router.get('/sortstad/:search/:stad', async (req, res) => {
        try {
            //save array cities
           const searchnow = req.params.search;

            //save array cities
            const searchstad = req.params.stad;
           
           //save array count
           const countarray = searchstad.count;

           if(searchnow == "undefined" || searchnow == "" || searchnow == null){
            const allPosts = await Companies.find({Stad:searchstad});;
            res.json(allPosts);
            console.log('het werkt undefined! ' + allPosts + searchnow)
    
          
           }else{
            console.log(searchstad)
            const posts = await Companies.find({Bedrijfstype: {$regex:searchnow,$options: 'i', Stad:searchstad}});
            // const postCombined = await posts.find({Stad:searchstad[i]})
            // filteredArray.push(postCombined)
            // const numbersCombined = {...numbersOne, ...numbersTwo};
          
            res.json(posts);
           return console.log('het werkt Stad ' + posts)

           }
           
            
    
    
        } catch (err) {
            res.json({ message: err });
            }
    });    
   

    //Update post

router.patch('/checkone/:postId/:checkone', async (req,res) => {
    try{
// const updatedPost = await mint.findByIdAndUpdate(
//     {_id: req.params.postId },
// { $set: { Name: req.params.checkValue }}

console.log('testwerkt')
      const naam = "Name";
      const idNow = await mint.findOne({_id: req.params.postId});
      const extractidnow = idNow.checkboxarray[1];
      if(req.params != undefined){
        const updatedPost = await mint.findByIdAndUpdate({_id: req.params.postId}, { $set: { checkboxarray: [req.params.checkone, extractidnow] }});

      } else{

        const updatedPost = await mint.findByIdAndUpdate({_id: req.params.postId}, { $set: { checkboxarray: [false, extractidnow] }});
      }
         
    return res.json("Updated onecheck");
              // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);
   

} catch (err) {
    res.json({ message: err});

}
    });

    //chechtwo

    router.patch('/checktwo/:postId/:checkTwo', async (req,res) => {
        try{
    // const updatedPost = await mint.findByIdAndUpdate(
    //     {_id: req.params.postId },
    // { $set: { Name: req.params.checkValue }}
    
    console.log('testwerkt')
          const naam = "Name";
    const idNow = await mint.findOne({_id: req.params.postId});
    const extractidnow = idNow.checkboxarray[0];

    if(req.params != undefined){
        const updatedPost = await mint.findByIdAndUpdate({_id: req.params.postId}, { $set: { checkboxarray: [extractidnow, req.params.checkTwo] }});


    }else{

        const updatedPost = await mint.findByIdAndUpdate({_id: req.params.postId}, { $set: { checkboxarray: [extractidnow, false] }});

    }
        return res.json("Updated twocheck");
                  // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);
       
    
    } catch (err) {
        res.json({ message: err});
    
    }
        });

         //get flatlist mintcompanies edit notification page
         router.get('/mintcompanieslist/:postId', async (req,res) => {
            try{
        const updatedPost = await Postmint.find(
            {email_id: req.params.postId,status: 0}, //creer dit in collectie
        // { $set: { title: req.body.title }}
        );
        res.json(updatedPost);
        } catch (err) {
            res.json({ message: err});
        
        }
            });

        // submit mint post

        router.get('/pushtokens/:tokenid', async (req,res) => {
            const tokenCheck = await Pushtokens.count({Usertoken: req.params.tokenid});
            const extracttokenCount = tokenCheck;

            if(extracttokenCount == 0){
                const post2 = new Pushtokens({
                    Usertoken: req.params.tokenid
                            
                    });
                    
                    post2.save()
                    .then(data => {
                    res.json(data);
                    console.log('token saved');  
                
                })
                .catch(err => { 
                    res.json({ message: err });
                    });
            

            }else{
                console.log('already in db ' + extracttokenCount)
            }

           
        }); //end request




        // submit mint post

        router.post('/users', async (req,res) => {
          
            const hashedPassword = await bcrypt.hash(req.body.Password, 10)
           
            console.log(hashedPassword)

            const post2 = new Users({
            Email_id: req.body.Email_id,
            Password: hashedPassword
                    
            });
            
            post2.save()
            .then(data => {
            res.json(data);
            console.log('User registered');  
        
        })
        .catch(err => { 
            res.json({ message: err });
            });
    
        }); //end request

        router.post('/users/login', async (req,res) => {
          console.log('stap 1')
            const user = await Users.find({Email_id: req.body.Email_id})
            const userCount = await Users.count({Email_id: req.body.Email_id})

           if (userCount == 0){
            console.log('stap 2')
            return res.status(400).send('Cannot find user')
           }
           const pw = await user[0].Password.toString();
           console.log(pw + " field password")
           console.log('middle', + req.body.Password + " user pw" + pw)
           try {
               if(await bcrypt.compare(req.body.Password, pw)) {
       
            res.send('Success')
            console.log('Success')
           } else {
            res.send('Not Allowed')
            console.log('Not Allowed')
           }
               } catch {
               res.status(500).send()
           }
        }); //end request


        //Ondernemers kunnen hier hun gevens opslaan en editen.

        router.patch('/editondernemer', async (req,res) => {
            try{
        // const updatedPost = await mint.findByIdAndUpdate(
        //     {_id: req.params.postId },
        // { $set: { Name: req.params.checkValue }}
        
        console.log('testwerkt')
            

              if( 1 == 1 ){
                console.log('testwerkt 2')
                const updatedPost = await Companies.findByIdAndUpdate({_id: '621092d8c01b17ebb4cba0a8'}, { $set: { Beschrijving: 'hoi'}});
                res.json(data);
              } else{
        
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.params.postId}, { $set: { 'Beschrijving': 'hoi'}});
              }
                 
            
           
        
        } catch (err) {
            res.json({ message: err});
        
        }
            });


        
    

module.exports = router;