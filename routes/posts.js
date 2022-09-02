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

const { createMollieClient } = require('@mollie/api-client');
const Abonees = require('../models/Abonees');
const mollieClient = createMollieClient({ apiKey: 'test_Mq4M2FHdQNtrjmqcUtjJxaq5kRSEfc' });




const router = express.Router();



router.get('/dashboardadmin', async (req,res) => {

    const admincheck = await Companies.find({});

   
    console.log(" count. " + admincheck);
    res.json(admincheck);
}); //end request

router.post('/checkinboxklant', async (req,res) => {

    const tokenCheck = await Inbox.count({user: req.body.klantid});
    const AboneesCount = await Inbox.count({user: req.body.klantid, ondernemer: req.body.ondernemerid});

    // const token = await tokenCheck[0].agendacount;
   
    console.log(" count. " + AboneesCount);
    // const updatedPost2 = await Companies.findByIdAndUpdate({_id: req.body.companyid}, { $set: { agendacount: token + 1 }});
    res.json(AboneesCount);
}); //end request

router.post('/addcountagenda', async (req,res) => {

    const tokenCheck = await Companies.find({_id: req.body.companyid});

    const token = await tokenCheck[0].agendacount;
   
    console.log(" agendacount. " + token);
    const updatedPost2 = await Companies.findByIdAndUpdate({_id: req.body.companyid}, { $set: { agendacount: token + 1 }});
    res.json(updatedPost2);
}); //end request

router.post('/addcountchat', async (req,res) => {

    const tokenCheck = await Companies.find({_id: req.body.companyid});

    const token = await tokenCheck[0].chatcount;
   
    console.log(" chatount. " + token);
    const updatedPost2 = await Companies.findByIdAndUpdate({_id: req.body.companyid}, { $set: { chatcount: token + 1 }});
    res.json(updatedPost2);
}); //end request


router.post('/checklimitscompany', async (req,res) => {

    const tokenCheck = await Companies.find({_id: req.body.id});
    const extracttokenCount = tokenCheck;
    
    res.json(tokenCheck);
    
    

}); //end request

router.post('/notify', async (req,res) => {
          
    const tokenCheck = await Companies.find({_id: req.body.companyid});
    const textnew = req.body.message;
    await console.log(' text', textnew);

    const token = await tokenCheck[0].pushkey.toString();
    await console.log(' token ', token);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "to": token,
    "title": "Fyxed Lead",
    "badge": 42,
    "body": textnew,
    "data": {
        textnew: "hoi hoi"
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://exp.host/--/api/v2/push/send", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

                            
        
          }); //end request





router.post('/notifiedklant', async (req,res) => {

    console.log('hoii');
          
    const tokenCheck = await Users.find({_id: req.body.klantid});
    const textnew = req.body.message;
    await console.log(' text', textnew);

    const token = await tokenCheck[0].pushtoken.toString();
    await console.log(' token ', token);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "to": token,
    "title": "Fyxed",
    "badge": 42,
    "body": textnew,
    "data": {
        textnew: "Je hebt een nieuw bericht!"
    }
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://exp.host/--/api/v2/push/send", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

                            
        
          }); //end request

          router.post('/checkofgeabboneerd', async (req,res) => {
            const AboneesCount = await Abonees.count({Email_id: req.body.emailadres, companysubscriptie: req.body.companysid});
            const gebruikers = await Abonees.find({Email_id: req.body.emailadres, companysubscriptie: req.body.companysid});
           
        if(AboneesCount == 1){

            res.json(true)
        }else{

            res.json(false)
        }
        
        
            
            }); //end request

//abonees


router.post('/abonnees', async (req,res) => {

    const AboneesCount = await Abonees.count({Email_id: req.body.emailadres, companysubscriptie: req.body.companysid});
    const gebruikers = await Abonees.find({Email_id: req.body.emailadres, companysubscriptie: req.body.companysid});
    //const companySubscribed = await Abonees.find({});
    await console.log('Abonees Countt' + AboneesCount);

    // extractVoornaam = await gebruikers[0].Voornaam.stringify();
    // console.log("Voornaam " + extractVoornaam)

    // extractAchternaam = await gebruikers[0].Achternaam.stringify();
    // console.log("Achternaam " + extractAchternaam)

    // extractTelefoon = await gebruikers[0].Telefoonnummer.stringify();
    // console.log("Telefoon nummer " + extractTelefoon)
    
    if(AboneesCount == 0) {
        
        const AboneesPost = new Abonees({
            Voornaam: req.body.naam,
            Achternaam: req.body.lastname,
            Email_id: req.body.emailadres,
            pushtoken: req.body.pushtoken,
            companysubscriptie: req.body.companysid
            });
            
            AboneesPost.save()
            .then(data => {
            res.json(data);
            console.log('saved abonees.'); 
        })
        
    }else{


 
    extractId = await gebruikers[0]._id.toString();
    console.log("Email_id " + extractId)

        const deletedPost = await Abonees.findOneAndDelete({Email_id: req.body.emailadres, companysubscriptie: req.body.companysid})
        console.log(extractId + 'Post Deleted')
        // const achternaam = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Achternaam: req.body.lastname}});
        // const telefoonnummer = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Telefoonnummer: req.body.telefoonnr}});
        // const mailadres = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Email_id: req.body.emailadres}});


    }




    
    }); //end request


router.post('/gebruiker', async (req,res) => {
    try{
        const updatedPost = await Users.findById({_id: req.body.id});
        res.json(updatedPost);

} catch (err) {
    res.json({ message: err});

}
    });

router.get('/gebruiker', async (req,res) => {
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

        router.post('/gebruikersprofiel', async (req,res) => {

            const gebruikersCount = await Users.count({Email_id: req.body.emailadres});
            const gebruikers = await Users.find({Email_id: req.body.emailadres});
        
        
          res.json(gebruikers);
        
        
            
            }); //end request        


router.post('/gebruikers', async (req,res) => {

    const gebruikersCount = await Users.count({Email_id: req.body.emailadres});
    const gebruikers = await Users.find({Email_id: req.body.emailadres});


    // extractVoornaam = await gebruikers[0].Voornaam.stringify();
    // console.log("Voornaam " + extractVoornaam)

    // extractAchternaam = await gebruikers[0].Achternaam.stringify();
    // console.log("Achternaam " + extractAchternaam)

    // extractTelefoon = await gebruikers[0].Telefoonnummer.stringify();
    // console.log("Telefoon nummer " + extractTelefoon)

    if(gebruikersCount == 0) {
        
        const userPost = new Users({
            Voornaam: req.body.naam,
            Achternaam: req.body.lastname,
            Telefoonnummer: req.body.telefoonnr,
            Email_id: req.body.emailadres,
            pushtoken: req.body.pushtoken,
            ondernemer: req.body.ondernemer,
            ondernemerId: req.body.ondernemerId
            });
            
            userPost.save()
            .then(data => {
            res.json(data);
            console.log('saved.'); 
        })
        
    }else{


 
    extractId = await gebruikers[0]._id.toString();
    console.log("Email_id " + gebruikersCount)

        const voornaam = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Voornaam: req.body.naam}});
        const achternaam = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Achternaam: req.body.lastname}});
        const telefoonnummer = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Telefoonnummer: req.body.telefoonnr}});
        const mailadres = await Users.findByIdAndUpdate({_id: extractId}, { $set: { Email_id: req.body.emailadres}});


    }




    
    }); //end request

router.post('/mollie49', async (req,res) => {


(async () => {
  const subscription = await mollieClient.customers_subscriptions.create({
    customerId: req.body.customer,
    amount: {
      currency: 'EUR',
      value: "49.00",
    },
    times: 4,
    interval: '1 month',
    description: req.body.calc,
    webhookUrl: req.body.webhooking,


  });
})();

res.json('Gelukt nuuu');

}); //end request

router.post('/mollie99', async (req,res) => {


    (async () => {
      const subscription = await mollieClient.customers_subscriptions.create({
        customerId: req.body.customer,
        amount: {
          currency: 'EUR',
          value: "99.00",
        },
        times: 4,
        interval: '1 month',
        description: req.body.calc,
        webhookUrl: req.body.webhooking,
    
    
      });
    })();
    
    res.json('Gelukt nuuu');
    
    }); //end request

    router.post('/mollie199', async (req,res) => {


        (async () => {
          const subscription = await mollieClient.customers_subscriptions.create({
            customerId: req.body.customer,
            amount: {
              currency: 'EUR',
              value: "199.00",
            },
            times: 4,
            interval: '1 month',
            description: req.body.calc,
            webhookUrl: req.body.webhooking,
        
        
          });
        })();
        
        res.json('Gelukt nuuu');
        
        }); //end request


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

    const tokenCheck = await Rates.count({companyid: req.body.companyid, usertoken: req.body.useremail});
    const extracttokenCount = tokenCheck;
    
    if(extracttokenCount == 0){

        const post2 = new Rates({
            rating: req.body.rating,
            favorite: req.body.favorite,
            companyid: req.body.companyid,
            usertoken: req.body.useremail,
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

router.post('/ratestotal', async (req,res) => {

    const tokenCheck = await Rates.count({companyid: req.body.companyid});
    const updatedPost = await Rates.find({companyid: req.body.companyid});
    const savedRating = pw + savedRating;
    const totalRating = savedRating / tokenCheck;

    console.log(tokenCheck + " count" + "savedrating " + savedRating + "total rating " + totalRating);

for(i=0; i < tokenCheck; i++){
    pw = await updatedPost[i].rating.toString();
    console.log(pw + " rating")

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
            datum: Date(),
            imagecompany:req.body.imagecompany

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


    //  set limit chats en agenda appointments after payment 

    router.patch('/companysublimit', async (req,res) => {
        try{
    // const updatedPost = await mint.findByIdAndUpdate(
    //     {_id: req.params.postId },
    // { $set: { Name: req.params.checkValue }}

       //   const naam = "Name";
         // const idNow = await Companies.findOne({_id: req.body.idbedrijf});
         // const extractidnow = idNow.checkboxarray[1];
    
            const updatedPost2 = await Companies.findByIdAndUpdate({_id: req.body.idbedrijf}, { $set: { limitchatcount: req.body.limitchat }});

            const updatedPost4 = await Companies.findByIdAndUpdate({_id: req.body.idbedrijf}, { $set: { limitagenda: req.body.limitbooking }});

            console.log('updated company sub limit')
         

             
        return res.json("Updated onecheck sub limit");
                  // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);
       
    
    } catch (err) {
        res.json({ message: err});
    
    }
        });

        //set company verified to true from admin dashboard
   
    router.patch('/verifycompany', async (req,res) => {
        try{
    // const updatedPost = await mint.findByIdAndUpdate(
    //     {_id: req.params.postId },
    // { $set: { Name: req.params.checkValue }}
    
    console.log('testwerkt')
       //   const naam = "Name";
         // const idNow = await Companies.findOne({_id: req.body.idbedrijf});
         // const extractidnow = idNow.checkboxarray[1];
    
            const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.idbedrijf}, { $set: { verification: true }});
           
            console.log('updated verification')
         

             
        return res.json("Updated onecheck");
                  // console.log('6. database', collectieURL, "prijs geupdate naar: ", outputPrice);
       
    
    } catch (err) {
        res.json({ message: err});
    
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
            

              if( req.body.bedrijfsnaam == 'naambedrijf' ){
                console.log('naam')
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.id}, { $set: { Bedrijfsnaam: req.body.officialname}});
              
              }

              if( req.body.stadnu == 'stad' ){
                console.log('naam')
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.id}, { $set: { Stad: req.body.officialstad}});
              
              }

              if( req.body.maplinknu == 'maplink' ){
                console.log('naam')
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.id}, { $set: { maplink: req.body.maplinkofficial}});
              
              }

              if( req.body.profielimagenu == 'profielimage' ){
                console.log('naam')
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.id}, { $set: { Imagenew: req.body.profielimageofficial}});
             
              }

              if( req.body.typebedrijfnu == 'bedrijfstype' ){
                console.log('naam')
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.id}, { $set: { Bedrijfstype: req.body.bedrijfstypeofficial}});
                
              }

              if( req.body.typebeschrijving == 'beschrijving' ){
                console.log('naam')
                const updatedPost = await Companies.findByIdAndUpdate({_id: req.body.id}, { $set: { Beschrijving: req.body.bedrijfsomschrijvingofficial}});
                res.json(req.body.bedrijfstypeofficial);
              }





                 
            
           
        
        } catch (err) {
            res.json({ message: err});
        
        }
            });


        
    

module.exports = router;