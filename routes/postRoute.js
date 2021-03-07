const { createPostGetControler, createPostPostControler, editPostGetController, editPostPostController } = require('../controllers/postController');
const postValidator = require('../validator/post/postValidator')
const { isAuthenticated } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')
const router = require('express').Router();

router.get('/create', isAuthenticated, createPostGetControler)
router.post('/create', isAuthenticated, upload.single('post-thumbnail'), postValidator, createPostPostControler)

router.get('/edit/:postId', isAuthenticated, editPostGetController)
router.post('/edit/:postId', isAuthenticated, upload.single('post-thumbnail'), postValidator, editPostPostController)

module.exports = router