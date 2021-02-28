const router = require('express').Router();
const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authController')

const { body } = require('express-validator')
const User = require('../models/User')

const singupValidator = [
    body('username')
        .isLength({ min: 2, max: 15 })
        .withMessage('Username Must Be Between 2 to 15 Chars')
        .custom(async username => {
            let user = await User.findOne({ username })
            if (user) {
                return Promise.reject('Username Already Used')
            }
        })
        .trim(),

    body('email')
        .isEmail()
        .withMessage('Please Provide A Valid Email')
        .custom(async email => {
            let user = await User.findOne({ email })
            if (user) {
                return Promise.reject('Email Already Used')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 5 })
        .withMessage('Your Pasword Must Be Greater Than 5 Chars'),

    body('confirmPassword')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error(' Password Does not Match')
            }
        })

];
//SignUp Routes
router.get('/signup', signupGetController);
router.post('/signup', singupValidator, signupPostController);

//Login Routes
router.get('/login', loginGetController);
router.post('/login', loginPostController);

//Logout Routes
router.get('/logout', logoutController);

module.exports = router