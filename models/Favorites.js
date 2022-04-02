const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Favorites = mongoose.Schema({
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
                    type: String,
                    required: false
                    },
                    companynaam: {
                        type: String,
                        required: false
                        },
                        stad: {
                            type: String,
                            required: false
                            },
                            picture: {
                                type: String,
                                required: false
                                },

                        

                                    
                            
                        
                    
                
            
            
            
                    
                    

});

module.exports = mongoose.model('favorites', Favorites);