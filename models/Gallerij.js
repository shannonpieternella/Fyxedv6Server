const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const Gallerij = mongoose.Schema({
  
                               Gallerij: {
                                    type: String,
                                    required: false
                                    },
                                    Naambedrijf: {
                                        type: String,
                                        required: false
                                        },
                                        IDbedrijf:{
                                            type: String,
                                            required: false
                                            },
                                        

                                   
    
    
            
    


        


                        
                    
                    

});

module.exports = mongoose.model('gallerij', Gallerij);