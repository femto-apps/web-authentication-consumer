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
    consumerId: "4f554bf1-0fda-4903-a894-9ed6f370d40c"
  },
  authenticationConsumer: {
    endpoint: 'http://localhost:3002'
  },
  redirect: true
}
