const User = require("../models/User");
const bcrypt = require('bcrypt');

// Sign Up Controller
exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create Your Account' })
}

exports.signupPostController = async (req, res, next) => {
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

}
exports.loginPostController = (req, res, next) => {

}


//Logout Controller
exports.logoutController = (req, res, next) => {

}