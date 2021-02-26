const {parseAsCurrent} = require('../index')

const {kebabCase} = require('lodash')

const {temporaryTransformPackage} = require('./utils/temporaryTransformPackage')
const {runNpmInstall} = require('./utils/runNpmInstall')

const path = require('path')

function generateLockFiles({basedir}) {
  if (!basedir) {
    throw new Error('Missing basedir')
  }

  const parseResult = parseAsCurrent(require(path.join(basedir, 'sanity-template.json')))

  if (parseResult.type === 'invalid') {
    throw new Error(
      `Cannot generate lockfiles. The manifest found in ./sanity-template.json is invalid: ${parseResult.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n')}`
    )
  }

  const manifest = parseResult.manifest

  if (manifest.deployment.provider !== 'netlify') {
    console.log('Not a netlify deployment, skipping lockfiles generation.')
    return
  }

  const prefix = kebabCase(manifest.title)

  const template = {
    name: `${prefix}`,
    dir: './template',
    path: path.resolve(basedir, 'template')
  }

  const sites = manifest.deployment.sites.map(deployment => ({
    name: `${prefix}-${deployment.id}`,
    dir: deployment.dir,
    path: path.resolve(template.path, deployment.dir)
  }))

  return Promise.all(
    [template, ...sites].map(async info => {
      const packagePath = path.join(info.path, 'package.json')
      const restorePkg = temporaryTransformPackage(packagePath, pkg => ({
        ...pkg,
        name: info.name
      }))

      await runNpmInstall(info.path)
      restorePkg()
      return info
    })
  )
}

module.exports = generateLockFiles
