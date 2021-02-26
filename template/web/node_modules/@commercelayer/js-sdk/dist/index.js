
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./js-sdk.cjs.production.min.js')
} else {
  module.exports = require('./js-sdk.cjs.development.js')
}
