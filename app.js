const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.render('index', {title: 'EJS is an Awesome Template Engine'})
})
app.get('*', (req, res) => {
    res.send(`
    <div>
        <h1>404</h1>
        <p>Page Not Found</p>
    </div>
    `)
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})