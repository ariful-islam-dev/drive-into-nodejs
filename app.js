const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config();

//Import Routes
const authRoutes = require('./routes/authRoute')

const app = express();

//Setup View Engine

app.set('view engine', 'ejs');
app.set('views', 'views')

// Middleware Arrary
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
];

app.use(middleware);

app.use('/auth', authRoutes);

app.get('/', (req, res) => {

    res.json({
        message: 'Hellow World'
    })
})
// const PORT = process.env.PORT || 8080;
const mongoDB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nine7.mongodb.net/exp-blog?retryWrites=true&w=majority`

mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Conneted');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT ${process.env.PORT}`);
        })
    })
    .catch(e => {
        console.log(e); 
    })

