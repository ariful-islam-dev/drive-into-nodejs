const {Schema, model} = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        type: String,
        require: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 9,
        maxlength: 15,
    }
})

let Contact = model('Contact', contactSchema);

module.exports = Contact;