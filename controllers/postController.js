const Flash = require("../utils/Flash")

exports.createPostGetControler = (req, res, next) => {

    res.render('pages/post/createPost.ejs',
        {
            title: 'Create A New Post',
            error: {},
            flashMessage: Flash.getMessage(req)
        }
    )
}

exports.createPostPostControler = (req, res, next) => {
    next()
}