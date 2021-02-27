const router = require('express').Router();

router.get('/validator', (req, res, nex)=>{
    res.render('playground/signup', {title: 'Validator Playground'})
})
router.post('/validator', (req, res, nex)=>{
    
})


module.exports = router;