const express = require('express');
const morgan = require('morgan');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');

const app = express();



app.use(morgan('dev'));



//User Router

app.use('/user', userRoute);
app.use('/posts', postRoute);

//user router end


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