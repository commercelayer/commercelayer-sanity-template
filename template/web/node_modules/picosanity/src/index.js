const fetch = require('node-fetch')
const Client = require('./client')

module.exports = function (cfg) {
  return new Client(cfg, fetch)
}
