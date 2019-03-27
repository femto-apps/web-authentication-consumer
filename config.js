module.exports = {
  port: 3001,
  mongo: {
    uri: 'mongodb://localhost:27017/',
    db: 'authentication',
  },
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 4, // 28 days
    secret: 'xyfguhijklXYCUBJHKNL;ML567689$%^%*&(8'
  },
  session: {
    secret: 'adstfygjgnfAESRTDYFVB435ryuthf£$%RE;;:',
  },
}
