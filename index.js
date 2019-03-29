const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const MongoClient = require('mongodb').MongoClient
const cookieParser = require('cookie-parser')
const express = require('express')
const config = require('@femto-apps/config')
const authenticationConsumer = require('@femto-apps/authentication-consumer')

;(async () => {
    const app = express()
    const port = 3002

    const db = (await MongoClient.connect(config.get('mongo.uri'), { useNewUrlParser: true })).db(config.get('mongo.db'))

    app.set('view engine', 'pug')

    app.use(express.static('public'))
    app.use(cookieParser(config.get('cookie.secret')))
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
    app.use(authenticationConsumer({
        tokenService: { endpoint: 'http://localhost:4500' },
        authenticationProvider: { endpoint: 'http://localhost:3001', consumerId: "5c9e89bbfc9a32ff296c9a44" },
        authenticationConsumer: { endpoint: 'http://localhost:3002' }
    }))

  //   tokenService: { endpoint },
  //   authenticationProvider: { endpoint, id, consumerId },
  //   authenticationConsumer: { endpoint }

    app.get('/', (req, res) => {
        res.render('home', { user: req.user } )
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}`))
})()
