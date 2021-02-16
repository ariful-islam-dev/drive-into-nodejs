const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end('<h1>Hello NodeJS, You Are Beauty</h1>')
});

server.listen(4141, ()=>{
    console.log(`Server is Running on post 4141`);
})