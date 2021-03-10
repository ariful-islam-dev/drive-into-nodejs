const { explorerGetController, singlePostGetController } = require('../controllers/explorerController')

const router = require('express').Router()


router.get('/', explorerGetController)



module.exports = router