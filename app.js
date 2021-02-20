const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));


app.get('/', (req, res) => {
    let post = {
        title: 'Test Title',
        body: 'Test Body',
        published: true
    }
    let posts = [
        {title: 'Title One', author: 'Ariful Islam'},
        {title: 'Title Two', author: 'Aysha Mone'},
        {title: 'Title Three', author: 'Abdullah al Zarif'},
        {title: 'Title Four', author: 'Azizul Islam'},
        {title: 'Title Five', author: 'Asia Khatun'}
    ]
    res.render('pages/index', { title: 'EJS is an Awesome Template Engine' , post,  posts})
})
app.get('/about', (req, res)=>{
    res.render('pages/about', {title: 'This is about page'})
})
app.get('/help', (req, res)=>{
    res.render('pages/help', {title: 'This is help page'})
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

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})