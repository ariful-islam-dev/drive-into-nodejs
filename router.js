

const router = require('express').Router();

router.get('/login', (req, res) => {
    res.send('I am login Route')
})
router.get('/logout', (req, res) => {
    res.send('I am logout Route');
})
router.get('/signup', (req, res) => {
    res.send('I am signup route')
})

module.exports = router;