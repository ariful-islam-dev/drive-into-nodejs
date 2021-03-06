const Flash = require("../utils/Flash");
const Profile = require('../models/Profile');
const errorFormatter = require('../utils/validationErrorFormatter');
const { validationResult } = require("express-validator");

exports.dashboardGetController = async (req, res, next) => {

    try {

        let profile = await Profile.findOne({ user: req.user._id })
        if (profile) {
            return res.render('pages/dashboard/dashboard',
                {
                    title: 'My Dahsboard',
                    error: {},
                    flashMessage: Flash.getMessage(req)
                })
        }

        res.redirect('/dashboard/create-profile')


    } catch (e) {
        next(e)
    }


}

exports.createProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })
        if (profile) {
            return res.redirect('/dashboard/edit-profile')
        }

        res.render('pages/dashboard/create-profile',
            {
                title: 'Create Your Profile',
                flashMessage: Flash.getMessage(req)
            })
    } catch (e) {
        next(e)
    }
}

exports.createProfilePostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    console.log(errors.mapped());

    res.render('pages/dashboard/create-profile',
        {
            title: 'Create Your Profile',
            flashMessage: Flash.getMessage(req)
        })
}


exports.editProfileGetController = async (req, res, next) => {

}
exports.editProfilePostController = async (req, res, next) => {

}