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
                                            },
                                            rating: {
                                                type: Decimal128,
                                                required: false
                                                },
                                                verification: {
                                                    type: Boolean,
                                                    required: false
                                                    },
                                                    
                                                        Beschrijving: {
                                                            type: String,
                                                            required: false
                                                            },
                                                            agenda: {
                                                                type: String,
                                                                required: false
                                                                },
                                                                Pictures: {
                                                                    type: String,
                                                                    required: false
                                                                    },
                                                                    Maplink: {
                                                                        type: String,
                                                                        required: false
                                                                        },
            
                                                                        pushkey: {
                                                                            type: String,
                                                                            required: false
                                                                            },
                                                                            agendacount: {
                                                                                type: Number,
                                                                                required: false
                                                                                },
                                                                                chatcount: {
                                                                                    type: Number,
                                                                                    required: false
                                                                                    },
                                                                                    limitagenda: {
                                                                                        type: Number,
                                                                                        required: false
                                                                                        },
                                                                                        limitchatcount: {
                                                                                            type: Number,
                                                                                            required: false
                                                                                            }
                        

                                    
                            
                        
                    
                
            
            
            
                    
                    

});

module.exports = mongoose.model('companies', CompanySchema);