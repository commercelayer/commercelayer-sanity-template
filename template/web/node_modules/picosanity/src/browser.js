const Client = require('./client')

module.exports = function (cfg) {
  return new Client(cfg, (input, init) => window.fetch(input, init))
}
