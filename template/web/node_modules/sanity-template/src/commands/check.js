const path = require('path')
const v1 = require('../manifest/v1')
const v2 = require('../manifest/v2')

function tryRequire(dir) {
  try {
    return require(dir)
  } catch (err) {}
  return null
}

const MANIFEST_PATHS = ['./sanity-template.json', './.sanity-template/manifest.json']

async function check({basedir}) {
  if (!basedir) throw new Error('missing basedir')

  let manifest
  MANIFEST_PATHS.map(dir => path.resolve(basedir, dir)).some(dir => {
    manifest = tryRequire(dir)
    if (manifest) {
      return true
    }
  })

  if (!manifest) {
    throw new Error(
      `Unable to resolve template manifest from current working directory. Attempted to read from the following locations:\n - ${MANIFEST_PATHS.join(
        '\n - '
      )}`
    )
  }

  switch (manifest.version) {
    case 0:
    case 1:
      return v1.parse(manifest)
    case 2:
      return v2.parse(manifest)
    default:
      return {
        type: 'invalid',
        errors: [{path: [], message: `invalid manifest version: ${manifest.version}`}]
      }
  }
}

module.exports = check
