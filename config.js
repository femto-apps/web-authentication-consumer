module.exports = {
  port: 3002,
  mongo: {
    uri: 'mongodb://localhost:27017/',
    db: 'authenticationConsumer',
  },
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4, // 28 days
    secret: 'xyfguhijklXYCUBJHKNL;ML567689$%^%*&(8', 
    name: 'consumer'
  },
  session: {
    secret: 'adstfygjgnfAESRTDYFVB435ryuthf£$%RE;;:',
  },
  tokenService: {
    endpoint: 'http://localhost:4500'
  },
  authenticationProvider: {
    endpoint: 'http://localhost:3001',
    consumerId: "ecb69978-7229-41c2-899c-b9dba79ca79f"
  },
  authenticationConsumer: {
    endpoint: 'http://localhost:3002'
  },
  redirect: true
}
