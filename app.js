const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const config = require('config');
const chalk = require('chalk')


//Mongodb URL
const mongoDB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.nine7.mongodb.net/exp-blog?retryWrites=true&w=majority`
//Import Middleware
const setMiddlewares = require('./middleware/middewares')
//Import Routes
const setRoutes = require('./routes/routes')


const app = express();

//Setup View Engine
app.set('view engine', 'ejs');
app.set('views', 'views')

//Using Middleware
setMiddlewares(app)
//Using Routes from Routes Directory
setRoutes(app)

mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.red('Database Conneted'));
        app.listen(process.env.PORT, () => {
            console.log(chalk.magenta.inverse(`Server is running on PORT ${process.env.PORT}`));
        })
    })
    .catch(e => {
        return console.log(e);
    })
