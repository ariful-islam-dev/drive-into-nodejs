const authRoute = require('./authRoute')
const dashboardRoutes = require('./dashboardRoute')
const playgroundRoutes = require('../playground/play')

const routes = [
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/playground',
        handler: playgroundRoutes
    },
    {
        path: '/',
        handler: (req, res) => {
            res.json({
                message: 'Hello World'
            })
        }
    }
]

module.exports = app => {
    routes.forEach(r => {
        if (r.path === '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}