const { getAllContacts, createContact } = require('./contactController');

const router = require('express').Router();

router.get('/', getAllContacts)
router.post('/', createContact)
// router.get('/:id')
// router.put('/:id')
// router.delete('/:id')


module.exports = router