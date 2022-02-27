const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const Companies = require('../models/Companies');
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



const router = express.Router();


router.get('/companies', async (req,res) => {
    try{
const updatedPost = await Companies.find();
res.json(updatedPost);
} catch (err) {
    res.json({ message: err});

}
    });
    
    router.get('/searchfyxed/:search/:stad', async (req, res) => {
        try {
            const searchnow = req.params.search;
            const searchstad = req.params.stad;  
            if(searchnow == "notworking"){
                console.log('het werkt! ' + allPosts)
                const allPosts = await Companies.find({Stad:searchstad});;
                res.json(allPosts);
                
                    //  console.log("search " + searchnow + " Stad " + searchstad)
            }else{
                const posts = await Companies.find({Bedrijfstype: {$regex:searchnow,$options: 'i', Stad:searchstad}});;
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



        
    

module.exports = router;