const Flash = require("../utils/Flash")

exports.explorerGetController = (req, res, next) => {
    res.render('pages/explorer/explorer.ejs' ,{
        title: 'Explore All Posts',
        filter: 'latest',
        flashMessage: Flash.getMessage(req)
    })
}