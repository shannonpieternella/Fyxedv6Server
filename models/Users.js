const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    Email_id: {
        type: String,
        required: false
        },
        Voornaam: {
            type: String,
            required: false
            },
            Achternaam: {
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
                                    pushtoken: {
                                        type: String,
                                        required: false
                                        },
                                       ondernemer: {
                                            type: Boolean,
                                            required: false
                                            },
                                            ondernemerId: {
                                                type: String,
                                                required: false
                                                },
                                                emailconfirmed: {
                                                    type: Boolean,
                                                    required: false
                                                    },
                                                   wachtwoord: {
                                                        type: String,
                                                        required: false
                                                        },
                                                        wachtwoordsaved: {
                                                            type: String,
                                                            required: false
                                                            }

                                   
    
    
            
    


        


                        
                    
                    

});

module.exports = mongoose.model('users', UserSchema);