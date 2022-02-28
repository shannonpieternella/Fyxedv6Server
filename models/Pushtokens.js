const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const UserPushtokens = mongoose.Schema({
    Usertoken: {
        type: String,
        required: false
        }
    
            
    


        


                        
                    
                    

});

module.exports = mongoose.model('tokens', UserPushtokens);