const express = require('express');
const morgan = require('morgan');
const contactRoute = require('./contactRoute');

const app = express();

app.use(morgan('dev'))

app.use('/contacts', contactRoute)

app.get('*', (req, res)=>{
    res.send('<h1>Please Use The Correct Routes</h1>')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})



//Routes
//Controller

//Contact