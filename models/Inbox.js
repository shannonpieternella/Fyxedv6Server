const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const InboxSchema = mongoose.Schema({
    pushtoken: {
        type: String,
        required: false
        },
        lastsentence: {
            type: String,
            required: false
            },
            user: {
                type: String,
                required: false
                },
                ondernemer: {
                    type: String,
                    required: false
                    },
                    dbname: {
                        type: String,
                        required: false
                        },
 
});

module.exports = mongoose.model('inbox', InboxSchema);