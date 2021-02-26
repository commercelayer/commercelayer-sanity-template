const fs = require('fs')

const chalk = require('chalk')
const path = require('path')
const api = require('./index')

module.exports = {
  async build(basedir, params) {
    return api.build({basedir, templateValuesPath: params.templateValues}).then(files => {
      files.forEach(file => console.log(`${chalk.green('build')} ${file}`))
    })
  },

  watch(basedir, params) {
    return new Promise((resolve, reject) => {
      api.watch({basedir, templateValuesPath: params.templateValues}).subscribe({
        next: msg => {
          switch (msg.type) {
            case 'built':
              console.log(`${chalk.green('build')} ${msg.file}`)
              break
            case 'unlinked':
              console.log(`${chalk.red('delete')} ${msg.file}`)
              break
            default:
              console.log(`${msg.type} ${msg.file}`)
              break
          }
        },
        error: reject,
        complete: resolve
      })
    })
  },

  async lockfiles(basedir) {
    console.log('Generating lockfiles by running npm install in template dirs…')
    const directories = await api.generateLockFiles({basedir})

    console.log('Generated lockfiles in: ')
    directories.forEach(info =>
      console.log(`\t${chalk.green(path.join(info.dir, '/package-lock.json'))}`)
    )
  },

  async migrate(basedir) {
    if (!basedir) throw new Error('missing basedir')

    const manifestFileName = 'sanity-template.json'
    const manifestPath = path.resolve(basedir, manifestFileName)
    let manifest
    try {
      manifest = require(manifestPath)
    } catch (requireErr) {
      throw new Error('missing file: sanity-template.json')
    }
    const migrated = api.migrate({manifest})
    if (migrated.version === manifest.version) {
      console.log(
        'The manifest at ./%s is already at current version (v%d)',
        manifestFileName,
        manifest.version
      )
      return
    }
    fs.writeFileSync(manifestPath, JSON.stringify(migrated, null, 2) + '\n')
    console.log(
      'Successfully migrated ./%s from v%d to v%d',
      manifestFileName,
      manifest.version,
      migrated.version
    )
  },

  async check(basedir) {
    const result = await api.check({basedir})

    if (result.type === 'invalid') {
      console.error(
        'Errors in sanity-template.json:\n%s',
        result.errors
          .map(
            err => `\t${err.path.join('') || '<root>'}: ${err.message.split('\n').join(`\n\t\t`)}`
          )
          .join('\n')
      )
      process.exit(1)
    }

    // success
    console.log(chalk.green(`✓ template directory is valid: ${basedir}`))
  }
}
