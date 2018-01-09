const { resolve } = require('path')

const themeColor = 'blue'

module.exports = {
  mode: 'spa',

  srcDir: __dirname,
  buildDir: resolve(__dirname, '.nuxt'),

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],

  plugins: [
    '~/plugins/onsen'
  ],

  manifest: {
    lang: 'en',
    name: 'music app',
    short_name: 'musicapp',
    description: 'best music app',
    theme_color: themeColor
  },

  proxy: [
    process.env.PROXY_API_URL || 'http://localhost:3000/api'
  ]
}
