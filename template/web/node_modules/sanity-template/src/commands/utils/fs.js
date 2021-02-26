const fs = require('fs')
const _mkdirp = require('mkdirp')
const path = require('path')
const _rimraf = require('rimraf')
const {promisify} = require('util')

const copyFile = promisify(fs.copyFile)
const lstat = promisify(fs.lstat)
const mkdirp = promisify(_mkdirp)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const rimraf = promisify(_rimraf)
const writeFile = promisify(fs.writeFile)

async function isDirectory(filePath) {
  const stats = await lstat(filePath)
  return stats.isDirectory()
}

async function readDirRecursive(dir) {
  const files = await readdir(dir)
  const filesInfo = await Promise.all(
    files.map(file => {
      const filePath = path.resolve(dir, file)

      if (fs.statSync(filePath).isDirectory()) {
        return readDirRecursive(filePath)
      } else {
        return Promise.resolve([filePath])
      }
    })
  )

  return filesInfo.reduce((acc, arr) => acc.concat(arr), [])
}

async function readJsonFile(filePath) {
  const buf = await readFile(filePath)
  return JSON.parse(buf.toString('utf-8'))
}

module.exports = {
  copyFile,
  isDirectory,
  lstat,
  mkdirp,
  readDirRecursive,
  readFile,
  readJsonFile,
  rimraf,
  writeFile
}
