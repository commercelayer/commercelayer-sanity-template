const path = require('path')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'lib', 'browser.js'),
  output: {
    library: 'PicoSanity',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'umd'),
    filename: 'client.js'
  }
}
