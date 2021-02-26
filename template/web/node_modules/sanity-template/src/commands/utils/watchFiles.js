const chokidar = require('chokidar')
const {Observable} = require('rxjs')

function watchFiles(patternOrArray, options) {
  return Observable.create(observer => {
    let watcher = chokidar.watch(patternOrArray, options)
    watcher.on('all', (event, file) => observer.next({type: event, file}))
    watcher.on('error', error => observer.error(error))
    return () => {
      watcher.close()
      watcher = null
    }
  })
}

module.exports = {watchFiles}
