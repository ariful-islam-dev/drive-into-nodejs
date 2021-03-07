const { createPostGetControler, createPostPostControler } = require('../controllers/postController');
const router = require('express').Router();

router.get('/create', createPostGetControler)
router.post('/create', createPostPostControler)

module.exports = router