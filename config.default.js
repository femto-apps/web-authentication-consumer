module.exports = {
  port: 3002,
  mongo: {
    uri: 'mongodb://localhost:27017/',
    db: 'authenticationConsumer',
  },
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4, // 28 days
    secret: 'CHANGE_ME', 
    name: 'consumer'
  },
  session: {
    secret: 'CHANGE_ME',
  },
  tokenService: {
    endpoint: 'CHANGE_ME'
  },
  authenticationProvider: {
    endpoint: 'CHANGE_ME',
    consumerId: 'CHANGE_ME'
  },
  authenticationConsumer: {
    endpoint: 'CHANGE_ME'
  },
  /**
   * Allow the user to be redirected to a path other than domain:port
   */
  redirect: true
}
