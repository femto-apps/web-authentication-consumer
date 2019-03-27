const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const MongoClient = require('mongodb').MongoClient
const cookieParser = require('cookie-parser')
const fetch = require('node-fetch')
const express = require('express')
const config = require('@femto-apps/config')

;(async () => {
    const app = express()
    const port = 3002

    const db = (await MongoClient.connect(config.get('mongo.uri'), { useNewUrlParser: true })).db(config.get('mongo.db'))

    app.set('view engine', 'pug')

    app.use(express.static('public'))
    app.use(cookieParser(config.get('cookie.secret'))
    app.use(expressSession({
        secret: config.get('session.secret'),
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ db }),
        name: 'consumer',
        cookie: {
            maxAge: config.get('cookie.maxAge')
        }
    }))
    app.use((req, res, next) => {
        if (req.session.token) {
            fetch(`${config.get('token')}${req.session.token}`)
                .then(resp => resp.json())
                .then(resp => {
                    req.session.user = resp
                    next()
                })
        } else {
            next()
        }
    })
    app.use((req, res, next) => {
        req.user = req.session.user
        next()
    })

    app.get('/', (req, res) => {
        console.log('hello', req.user)
        res.render('home', { user: req.user } )
        console.log(req.session)
    })
    app.get('/login', (req, res) => {
        console.log('redirecting')
        res.redirect(config.get('provider.login'))
        console.log('redirected')
    })
    app.get('/login_callback', (req, res) => {
        const { token } = req.query
        req.session.token = token
        res.redirect('/')
    })
    app.get('/logout', (req, res) => {
        req.session.user = undefined
        req.session.token = undefined
        res.redirect(config.get('provider.logout'))
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})()
