const router = require('express').Router();
const { signupGetController, signupPostController, loginGetController, loginPostController, logoutController } = require('../controllers/authController');
const loginValidator = require('../validator/auth/loginValidator');



const singupValidator = require('../validator/auth/signupValidator')


//SignUp Routes
router.get('/signup', signupGetController);
router.post('/signup', singupValidator, signupPostController);

//Login Routes
router.get('/login', loginGetController);
router.post('/login', loginValidator , loginPostController);

//Logout Routes
router.get('/logout', logoutController);

module.exports = router