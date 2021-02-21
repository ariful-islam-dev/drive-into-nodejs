const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let Schema = mongoose.Schema
let testSchema = new Schema({
    name: String,

})
let Test = mongoose.model('Test', testSchema);


app.get('/', (req, res) => {
    
    let test = new Test({
        name: 'Ariful Islam'
    })
    test.save()
        .then(t=>{
            res.json(t)
        })
        .catch(e=>{
            console.log(e);
            res.status(500).json({
                error:'Error Ocurse'
            })
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

