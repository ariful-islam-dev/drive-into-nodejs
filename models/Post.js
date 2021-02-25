//title, body, authoer, tags, thumbnail, readTime, likes, dislikes, comments

const { Schema, model } = require('mongoose');
const User = require('./User');
const Comment = require('./Comment')

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
    dislikes: [
        {
            type: Schema.Types.ObjectId,
            ref: User
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: Comments
        }
    ]

}, { timestamps: true });

const Post = model('Post', postSchema);
module.exports = Post