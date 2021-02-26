const fs = require('fs')
const path = require('path')
const {from, merge, of} = require('rxjs')
const {concatMap, filter, map, switchMap} = require('rxjs/operators')
const {buildFile} = require('./utils/buildFile')
const {watchFiles} = require('./utils/watchFiles')
const {readJsonFile, rimraf} = require('./utils/fs')

function watch(opts) {
  if (!opts.basedir) {
    throw new Error('Missing basedir')
  }

  const templateDir = path.resolve(opts.basedir, 'template')
  const buildDir = path.resolve(opts.basedir, 'build')

  const templateValuesPath = path.resolve(opts.basedir, opts.templateValuesPath)

  const templateValuesPathChange$ = watchFiles(templateValuesPath)

  const templateValues$ = templateValuesPathChange$.pipe(
    concatMap(() => from(readJsonFile(templateValuesPath)))
  )

  const templateFile$ = templateValues$.pipe(
    switchMap(templateValues =>
      watchFiles(templateDir, {
        ignored: /\/node_modules\//
      }).pipe(
        map(({type, file}) => ({
          type,
          file: path.relative(templateDir, file),
          templateValues
        }))
      )
    )
  )

  const addOrChangedFile$ = templateFile$.pipe(
    filter(({type}) => ['add', 'change'].indexOf(type) > -1)
  )

  const unlinkFile$ = templateFile$.pipe(filter(({type}) => type === 'unlink'))

  const builtFile$ = addOrChangedFile$.pipe(
    concatMap(({file, templateValues}) => {
      const fromPath = path.resolve(templateDir, file)
      const toPath = path.resolve(buildDir, file)
      const isFile = fs.statSync(fromPath).isFile()
      if (isFile) {
        return from(
          buildFile(fromPath, toPath, templateValues).then(() => ({
            type: 'built',
            file
          }))
        )
      }
      return of({type: 'ignore', file})
    })
  )

  const unlinkedFile$ = unlinkFile$.pipe(
    concatMap(({file}) =>
      from(
        rimraf(path.resolve(buildDir, file)).then(() => ({
          type: 'unlinked',
          file
        }))
      )
    )
  )

  return merge(builtFile$, unlinkedFile$)
}

module.exports = watch
