const router = require('express').Router();
const { signupGetController, signupPostController , loginGetController, loginPostController} = require('../controllers/authController')


//SignUp Routes
router.get('/signup', signupGetController );
router.post('/signup', signupPostController );

//Login Routes
router.get('/login', loginGetController);
router.post('/login', loginPostController);

//Logout Routes
router.get('/logout', logoutController)

module.exports = router