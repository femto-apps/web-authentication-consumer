const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const MongoClient = require('mongodb').MongoClient
const cookieParser = require('cookie-parser')
const express = require('express')
const config = require('@femto-apps/config')
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

  app.use(authenticationConsumer({
    tokenService: { endpoint: config.get('authenticationService.tokenService.endpoint') },
    authenticationProvider: { endpoint: config.get('authenticationService.authenticationProvider.endpoint'), consumerId: config.get('authenticationService.authenticationProvider.consumerId') },
    authenticationConsumer: { endpoint: config.get('authenticationService.authenticationConsumer.endpoint') }
  }))

  // tokenService: { endpoint },
  // authenticationProvider: { endpoint, id, consumerId },
  // authenticationConsumer: { endpoint }

  app.get('/', (req, res) => {
      res.render('home', { user: req.user } )
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}`))
})()
