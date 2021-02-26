const {execFile: nodeExecFile} = require('child_process')
const {promisify} = require('util')

const execFile = promisify(nodeExecFile)

exports.exec = (file, args, options) =>
  execFile(file, args, options).then(({stderr, stdout}) => stdout)
