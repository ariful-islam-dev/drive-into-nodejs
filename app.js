const express = require('express');

const app = express();

app.get('/about', (req, res)=>{
    res.send(`<h1>I am about page</h1>`)
})
app.get('/help', (req, res)=>{
    res.send(`<h1>I am help page</h1>`)
})


app.get('/', (req, res)=>{
    res.send(` <h1>I am listening</h1>`)
})

app.get('*', (req, res)=>{
    res.send(` <h1>404 Not Found</h1>`)
})


const PORT = process.env.PORT || 8080;
app.listen( PORT, ()=>{
    console.log(`Server is Running on PORT ${PORT}`);
})