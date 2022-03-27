const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Engagements = mongoose.Schema({
    rating: {
        type: Number,
        required: false
        },
        favorite: {
            type: Boolean,
            required: false
            },
            companyid: {
                type: String,
                required: false
                },
                usertoken: {
                    type: Number,
                    required: false
                    },
                    companynaam: {
                        type: String,
                        required: false
                        },
                        
                
        

                        

                                    
                            
                        
                    
                
            
            
            
                    
                    

});

module.exports = mongoose.model('engagements', Engagements);