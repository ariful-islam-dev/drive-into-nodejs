const router = require('express').Router();

//example.com/posts GET
router.get('/', (req, res) => {
    
    let {category, page, filter} = req.query
    res.send('Render All Post')
});
router.get('/:postId', (req, res)=>{
    res.send('I am POST = ' + req.params.postId)
})

//example.com/posts POST
router.post('/', (req, res) => {
    res.send('Create New Post')
});

router.put('/:postId', (req, res)=>{
    res.send('Update Your Existing Post = '+ req.params.postId)
});

router.delete('/:postId', (req, res)=>{
    res.send('delete Your Existion Post = '+ req.params.postId)
});

module.exports = router