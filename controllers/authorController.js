const Flash = require("../utils/Flash")

exports.authorProfileGetController = async (req, res, next)=>{
    res.render('pages/explorer/author', {
        title: 'Author Page',
        flashMessage: Flash.getMessage(req)
    })
}