module.exports = {
  // Routes
  prefix: '/api',
  routes: [
    './controllers/test-controller'
  ],

  // Plugins
  registrations: [
    '@bakjs/mongo',
  ],

  // Mongo
  mongo: {
    connections: {
      default: { uri: 'mongodb://localhost/test' }
    }
  }
}
