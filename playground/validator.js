const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Flash = require('../utils/Flash')

router.get('/validator', (req, res, next) => {
    console.log(Flash.getMessage(req));


    res.render('playground/signup', { title: 'Validator Playground' })
})
router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage(`Username can not be empty`)
            .isLength({ max: 15 })
            .withMessage(`Username can not be greter than 15 Character`)
            .trim(),

        check('email')
            .isEmail()
            .withMessage(`Please Provide A Valid Email`)
            .normalizeEmail(),

        check('password').custom((value) => {
            if (value.length < 5) {
                throw new Error(`Password Must be greter then 5 character`);
            }

            return true;
        }),
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }

            // Indicates the success of this synchronous custom validator
            return true;
        }),




    ],
    (req, res, next) => {
        let errors = validationResult(req)

        if(!errors.isEmpty()){
            req.flash('fail', 'There is some Error')
        }else{
            req.flash('success','There is no Error Here')
        }

        res.redirect('/playground/validator')
        
    })


module.exports = router;