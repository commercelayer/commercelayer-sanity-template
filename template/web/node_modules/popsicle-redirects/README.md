# Popsicle Redirects

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Popsicle middleware for following HTTP redirects.

## Installation

```
npm install popsicle-redirects --save
```

## Usage

```js
import { redirects } from "popsicle-redirects";

const middleware = redirects(transport());
```

### Options

* `fn` Wrap a [`throwback`](https://github.com/serviejs/throwback) compatible middleware function in redirect behavior
* `maxRedirects` Set the maximum number of redirects to attempt before throwing an error (default: `5`)
* `confirmRedirect` Confirmation function for following 307 and 308 non-idempotent redirects (default: `() => false`)

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/popsicle-redirects.svg?style=flat
[npm-url]: https://npmjs.org/package/popsicle-redirects
[downloads-image]: https://img.shields.io/npm/dm/popsicle-redirects.svg?style=flat
[downloads-url]: https://npmjs.org/package/popsicle-redirects
[travis-image]: https://img.shields.io/travis/serviejs/popsicle-redirects.svg?style=flat
[travis-url]: https://travis-ci.org/serviejs/popsicle-redirects
[coveralls-image]: https://img.shields.io/coveralls/serviejs/popsicle-redirects.svg?style=flat
[coveralls-url]: https://coveralls.io/r/serviejs/popsicle-redirects?branch=master
