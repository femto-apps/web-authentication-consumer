const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const MongoClient = require('mongodb').MongoClient
const cookieParser = require('cookie-parser')
const express = require('express')
const config = require('@femto-apps/config')
const favicon = require('serve-favicon')
const authenticationConsumer = require('@femto-apps/authentication-consumer')
const morgan = require('morgan')

;(async () => {
  const app = express()
  const port = config.get('port')

  const db = (await MongoClient.connect(config.get('mongo.uri'), { useNewUrlParser: true })).db(config.get('mongo.db'))

  app.set('view engine', 'pug')

  app.use(express.static('public'))
  app.use(cookieParser(config.get('cookie.secret')))
  app.use(expressSession({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ db }),
    name: config.get('cookie.name'),
    cookie: {
      maxAge: config.get('cookie.maxAge')
    }
  }))

  app.use(morgan('dev'))

  app.get('/favicon.ico', favicon('./favicon/favicon.ico'))

  app.use(authenticationConsumer({
    tokenService: { endpoint: config.get('tokenService.endpoint') },
    authenticationProvider: { endpoint: config.get('authenticationProvider.endpoint'), consumerId: config.get('authenticationProvider.consumerId') },
    authenticationConsumer: { endpoint: config.get('authenticationConsumer.endpoint') },
    redirect: config.get('redirect')
  }))

  app.get('/', (req, res) => {
      res.render('home', { user: req.user } )
  })

  app.get('/loggedin', (req, res) => {
    res.render('loggedIn', { user: req.user })
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}`))
})()
