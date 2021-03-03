const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


//Import Routes
const authRoutes = require('./routes/authRoute')

//Import Middleware
const { bindeUserWithRequest } = require('./middleware/authMiddleware')
//plyground Routes
// const validatorRoutes = require('./playground/validator');

const app = express();

const mongoDB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nine7.mongodb.net/exp-blog?retryWrites=true&w=majority`
var store = new MongoDBStore({
    uri: mongoDB_URI,
    collection: 'session',
    expires:1000 * 60 * 60 * 2
});


//Setup View Engine

app.set('view engine', 'ejs');
app.set('views', 'views')

// Middleware Arrary
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || "SECRET_KEY",
        resave: false,
        saveUninitialized: false,
        store: store

    }),
    bindeUserWithRequest()
];

app.use(middleware);


app.use('/auth', authRoutes);
// app.use('/playground', validatorRoutes) //Todo shuld be remove

app.get('/', (req, res) => {

    res.json({
        message: 'Hellow World'
    })
})
// const PORT = process.env.PORT || 8080;


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

