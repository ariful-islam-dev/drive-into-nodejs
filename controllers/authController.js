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
    res.render('pages/auth/login.ejs', { title: 'Login Your Account' })
}
exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if(!user){
            res.json({
                message: 'Invalid Credential'
            })
        }else{
            let match = await bcrypt.compare(password, user.password);
            if(!match){
                res.json({
                    message: 'Invalid Credential'
                })
            }else{
                console.log('Successfuly Logged in', user);
                res.render('pages/auth/login.ejs', { title: 'Create Your Account' , user})
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