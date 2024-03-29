const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    Email_id: {
        type: String,
        required: false
        },
        Password: {
            type: String,
            required: false
            },
        
            Bedrijfsnaam: {
                type: String,
                required: false
                },
                Telefoonnummer: {
                    type: Number,
                    required: false
                    },
                    Straatnaam: {
                        type: String,
                        required: false
                        },
                        Huisnummer: {
                            type: Number,
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
                                    Bedrijfstype: {
                                        type: String,
                                        required: false
                                        },
                                        Imagenew: {
                                            type: String,
                                            required: false
                                            }

                        

                                    
                            
                        
                    
                
            
            
            
                    
                    

});

module.exports = mongoose.model('companies', CompanySchema);