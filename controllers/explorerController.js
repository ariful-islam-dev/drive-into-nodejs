const Flash = require("../utils/Flash")
const Post = require('../models/Post')

exports.explorerGetController = async(req, res, next) => {

    try{
        let posts = await Post.find()

        res.render('pages/explorer/explorer.ejs' ,{
            title: 'Explore All Posts',
            filter: 'month',
            flashMessage: Flash.getMessage(req),
            posts
        })
    }catch(e){
        next(e)
    }

    
}