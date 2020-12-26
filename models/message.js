const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MessageModel = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('message', MessageModel, 'message')