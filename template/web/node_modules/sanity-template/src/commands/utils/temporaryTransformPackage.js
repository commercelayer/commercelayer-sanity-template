// temporarily replace package name of package.json to allow for npm install
// this is needed since the package.name may include template variable syntax which
// makes npm install fail due to invalid characters
const fs = require('fs')
exports.temporaryTransformPackage = (
  pkgPath /* string */,
  transform /* (pkgDef: object) => object */
) => {
  const originalContents = fs.readFileSync(pkgPath, 'utf-8')
  const pkgDef = JSON.parse(originalContents)
  fs.writeFileSync(pkgPath, JSON.stringify(transform(pkgDef)))
  let restored = false
  const restore = () => {
    if (restored) {
      return
    }
    restored = true
    process.off('exit', restore)
    fs.writeFileSync(pkgPath, originalContents)
  }
  process.on('exit', restore)
  return restore
}
