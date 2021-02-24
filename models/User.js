// name, Email, Password and Profile

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        require: true
    },
    email:{
        tryp: String,
        trim: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, {
    timestamps: true
})

const User = modle('User', userSchema);
module.exports = User