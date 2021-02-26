import {toCurrent} from '../manifest/migrate'
import {current} from '..'

module.exports = function migrate({manifest}: {manifest: any}) {
  const migrated = toCurrent(manifest)
  const result = current.parse(migrated)
  if (result.type === 'invalid') {
    throw new Error(
      'Migration of manifest caused invalid template:\n' +
        result.errors
          .map(error => `${error.path.join(' → ') || '<root>'}: ${error.message}`)
          .join('\n')
    )
  }
  return migrated
}
