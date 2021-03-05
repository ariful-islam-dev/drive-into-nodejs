const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const Flash = require('../utils/Flash')

router.get('/play', (req, res, next) => {
    res.render('playground/play', {title: 'playground', flashMessage: {}})
})
router.post('/play', (req, res, next) => {
        res.redirect('/playground/play')
        
    })


module.exports = router;