const {exec} = require('./exec')
const resolveBin = require('resolve-bin')

const npmbinary = resolveBin.sync('npm')

exports.runNpmInstall = directory =>
  exec(npmbinary, ['install', '--prefix', directory, '--ignore-scripts', '--prefer-offline'], {
    cwd: directory
  })
