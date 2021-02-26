const User = require("../models/User");

// Sign Up Controller
exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup.ejs', { title: 'Create Your Account' })
}

exports.signupPostController = async(req, res, next) => {
    const { email, username, password } = req.body;

    let user = new User({
        username,
        email, 
        password
    })

    try{
        let createdUser = await user.save()
        console.log('User created Succefully', createdUser);
        res.render('pages/auth/signup.ejs', { title: 'Create Your Account' })
    }catch(e){

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