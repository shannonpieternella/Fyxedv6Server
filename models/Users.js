const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Email_id: {
        type: String,
        required: false
        },
        Password: {
            type: String,
            required: false
            },
                Telefoonnummer: {
                    type: String,
                    required: false
                    },
                    Straatnaam: {
                        type: String,
                        required: false
                        },
                        Huisnummer: {
                            type: String,
                            required: false
                            },
                            Postcode: {
                                type: String,
                                required: false
                                },
                                Stad: {
                                    type: String,
                                    required: false
                                    },
                                   
    
    
            
    


        


                        
                    
                    

});

module.exports = mongoose.model('users', UserSchema);