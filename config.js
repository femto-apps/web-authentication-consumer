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
  provider: {
    login: 'http://localhost:3001/api/auth?id=100&redirect=http://localhost:3002/login_callback', 
    logout: 'http://localhost:3001/logout'
  }, 
  token: 'http://localhost:4500/?token='
}
