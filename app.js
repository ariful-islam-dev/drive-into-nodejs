const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const config= require('config')


//Import Routes
const authRoutes = require('./routes/authRoute');
const dashboardRoutes = require('./routes/dashboardRoute')

//Import Middleware
const { bindeUserWithRequest } = require('./middleware/authMiddleware')
const setLocals = require('./middleware/setLocals');
// const config = require('./config/config');
//plyground Routes
// const validatorRoutes = require('./playground/validator');

const app = express();

const DB_ADMIN = config.get('db-username')
const DB_PASSWORD = config.get('db-password')

const mongoDB_URI = `mongodb+srv://${DB_ADMIN}:${DB_PASSWORD}@cluster0.nine7.mongodb.net/exp-blog?retryWrites=true&w=majority`
var store = new MongoDBStore({
    uri: mongoDB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});
// console.log(process.env.NODE_ENV);
// console.log(app.get('env'));

console.log(config.get('name'));

// if (app.get('env').toLowerCase() === 'development') {
//     console.log(config.dev.name);

// } else {
//     console.log(config.prod.name);
// }


if (app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'))
}


//Setup View Engine

app.set('view engine', 'ejs');  
app.set('views', 'views')

// Middleware Arrary
const middleware = [
    // morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        store: store

    }),
    bindeUserWithRequest(),
    setLocals(),
    flash()
];

app.use(middleware);


app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
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
        return console.log(e);
    })

