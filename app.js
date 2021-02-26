const express = require('express');
const morgan = require('morgan')

const app = express();

//Setup View Engine

app.set('view engine', 'ejs');
app.set('views', 'views')

// Middleware Arrary
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json()
];

app.use(middleware);


app.get('/', (req,res)=>{
    res.render('pages/auth/signup',{title: 'Create A New Account'})
    res.json({
        message: 'Hellow World'
    })
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})