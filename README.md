# Drive Into NodeJS

## ExpressJS Framwork

- [x] Request
- [x] Response


### Manage NPM Package

* > npm init -y
* > npm i express
* > npm i -D nodemon

### File Create
- [x] app

## Middlewares

#### Third party middleware
      > npm i morgan
#### How to use middleware
    01.  > app.use(morgan('dev'))
    02.  > app.get('/', morgan('dev'), (req, res)=>{res.send(data)})

