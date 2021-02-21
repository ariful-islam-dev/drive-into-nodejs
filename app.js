const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const contactRoute = require('./routes')

const app = express();


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/contacts', contactRoute)



app.get('/', (req, res) => {
    res.json({
        message: 'Welocome to our practice ESJ Template Engine'
    })
})

const PORT = process.env.PORT || 8080;
const DB_URL = `mongodb://localhost/testDB`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('Database is connected');
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
        })
    })
    .catch(e=>{
        console.log(e.message);
    })

