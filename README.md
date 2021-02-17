# Drive Into NodeJS

## ExpressJS Framwork

### Manage NPM Package

* > npm init -y
* > npm i express
* > npm i -D nodemon

### File Create
- [x] app

### How to Set environment PORT
  - > export PORT=7070
### React Route
  > app.get('/help', (req, res)=>{'help page'})
  > app.get('/about', (req, res)=>{'about page'})
  > app.get('/', (req, res)=>{'Home Page'})
  > app.get('*', (req, res)=>{ res.send('404 Not found')})