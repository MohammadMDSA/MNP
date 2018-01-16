module.exports = {
  // Routes
  prefix: '/api',
  routes: [
    './controllers/test-controller'
  ],

  // Plugins
  registrations: [
    '@bakjs/mongo',
    // '@bakjs/auth'
  ],

  // Mongo, lkm
  mongo: {
    connections: {
      default: { uri: 'mongodb://localhost/test' }
    }
  },

    // auth: {
    //   secret: "ddfdfkdofdkfo343"
    // }
}
