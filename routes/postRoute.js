const { createPostGetControler, createPostPostControler } = require('../controllers/postController');
const postValidator = require('../validator/post/postValidator')
const { isAuthenticated } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')
const router = require('express').Router();

router.get('/create', createPostGetControler)
router.post('/create', isAuthenticated, upload.single('post-thumbnail'), postValidator, createPostPostControler)

module.exports = router