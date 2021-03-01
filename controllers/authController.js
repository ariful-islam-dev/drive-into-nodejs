const User = require("../models/User");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const errorFormatter = require('../utils/validationErrorFormatter')

// Sign Up Controller
exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create Your Account', error: {} })
}

exports.signupPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup.ejs', { title: 'Create Your Account', error: errors.mapped() })
    }


    const { email, username, password } = req.body;



    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()
        console.log('User created Succefully', createdUser);
        res.render('pages/auth/signup.ejs', { title: 'Create Your Account' })
    } catch (e) {

        console.log(e);
        next(e)
    }

}


//Login Controller
exports.loginGetController = (req, res, next) => {
    // let isLoggedIn = req.get('Cookie').includes('isLoggedIn') ? true : false
    res.render('pages/auth/login.ejs', { title: 'Login Your Account', error: {}, isLoggedIn:false })
}
exports.loginPostController = async (req, res, next) => {
    let isLoggedIn = req.get('Cookie').includes('isLoggedIn') ? true : false
    let { email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/login.ejs', { title: 'Login to Your Account', error: errors.mapped(), isLoggedIn })
    }

    try {
        let user = await User.findOne({ email })

        if (!user) {
            res.json({
                message: 'Invalid Credential'
            })
        } else {
            let match = await bcrypt.compare(password, user.password);
            if (!match) {
                res.json({
                    message: 'Invalid Credential'
                })
            } else {
                res.setHeader('Set-Cookie', 'isLoggedIn=true');
                res.render('pages/auth/login.ejs', { title: 'Create Your Account', user, error: {}, isLoggedIn })
            }
        }
    } catch (e) {
        console.log(e);
        next(e)
    }

}


//Logout Controller
exports.logoutController = (req, res, next) => {

}