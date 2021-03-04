const Flash = require("../utils/Flash")

exports.dashboardGetController = (req, res, next)=>{
    res.render('pages/dashboard/dashboard',
    {
        title: 'My Dahsboard',
         error: {},
         flashMessage: Flash.getMessage(req)
    })
}