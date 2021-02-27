const router = require('express').Router();
const { check, validationResult } = require('express-validator');

router.get('/validator', (req, res, nex) => {
    res.render('playground/signup', { title: 'Validator Playground' })
})
router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage(`Username can not be empty`)
            .isLength({ max: 15 })
            .withMessage(`Username can not be greter than 15 Character`),

        check('email')
            .isEmail()
            .withMessage(`Please Provide A Valid Email`)
    ],
    (req, res, nex) => {
        let errors = validationResult(req)
        console.log(errors);
    })


module.exports = router;