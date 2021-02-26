const build = require('./build')
const watch = require('./watch')
const generateLockFiles = require('./generateLockFiles')
const check = require('./check')
const migrate = require('./migrate')

module.exports = {migrate, build, watch, generateLockFiles, check}
