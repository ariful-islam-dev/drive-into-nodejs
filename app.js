const express = require('express');
const morgan = require('morgan');

const app = express();



app.use(morgan('dev'));



//User Router
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('I am login Route')
})
router.get('/logout', (req, res) => {
    res.send('I am logout Route');
})
router.get('/signup', (req, res) => {
    res.send('I am signup route')
})


//user router end

app.use('/user', router)
app.get('/', (req, res) => {
    res.send(` <h1>NodeJS is Awesome!!!!</h1>`)
})

app.get('*', (req, res) => {
    res.send(` <h1>404 Not Found</h1>`)
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
})