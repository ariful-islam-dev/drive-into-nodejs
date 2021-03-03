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
    console.log(req.session.isLoggedIn, req.session.user);
    res.render('pages/auth/login.ejs', {
        title: 'Login Your Account', error: {}
    })
}
exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body;

    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/login.ejs', { title: 'Login to Your Account', error: errors.mapped() })
    }

    try {
        let user = await User.findOne({ email })

        if (!user) {
            res.json({
                message: 'Invalid Credential'
            })
        }
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
            res.json({
                message: 'Invalid Credential'
            })
        } else {
            req.session.isLoggedIn = true,
                req.session.user = user,
                req.session.save(err=>{
                    if(err){
                        console.log(err);
                        return next(err)
                    }
                    res.redirect('/dashboard')
                })
               
        }
    } catch (e) {
        console.log(e);
        next(e)
    }

}


//Logout Controller
exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}