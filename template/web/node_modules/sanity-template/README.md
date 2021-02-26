# sanity-template

Sanity template developer tools, documentation and specification.

```sh
npm install sanity-template --save-dev
```

[![npm version](https://img.shields.io/npm/v/sanity-template.svg?style=flat-square)](https://www.npmjs.com/package/sanity-template)

## Specification

WARNING: Not ready for public consumption

- [Template manifest specification](SPEC-MANIFEST.md)

## Documentation

`sanity-template` is an npm module which exposes both a CLI and a Node.js API.

### CLI

```sh
# Build template files from `template/` to `build/`
npx sanity-template build --template-values values.json

# The same, but in watch mode
npx sanity-template watch --template-values values.json

# Check if the template is valid
npx sanity-template check
```

This will copy files from the `template` directory into the `build` (which should be gitignored). The files in the `build` directory will have template variables replaced (`<#<varName>#>`).

### Node.js API

#### `build`

The `build` method returns a `Promise` instance:

```js
const {build} = require("sanity-template");

build({
  basedir: "path/to/basedir",
  templateValuesPath: "template-values.json"
})
  .then(() => console.log("successfully built"))
  .catch(err => console.error(err));
```

#### `lockfiles`

This will generate lockfiles in all your template's deployment directory. Generating package-lock.json files will reduce build time.

#### `watch`

The `watch` method returns an RxJS `Observable` instance:

```js
const {watch} = require("sanity-template");

watch({
  basedir: "path/to/basedir",
  templateValuesPath: "template-values.json"
}).subscribe({
  next: ({ type, file }) => console.log(`${type}: ${file}`),
  error: err => console.error(err)
});
```

#### `check`

The `check` method returns a `Promise` instance (however you need to check result value for status):

```js
const {check} = require("sanity-template");

check({
  basedir: "path/to/basedir"
})
  .then(({errors, isSuccess}) => {
    if (isSuccess) {
      console.log("the template is valid")
    } else {
      console.error(errors)
    }
  })
```

## License

[MIT](LICENSE) © [Sanity.io](https://www.sanity.io)
