# Popsicle Content Encoding

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Popsicle middleware for supporting `Content-Encoding` compression.

## Installation

```
npm install popsicle-content-encoding --save
```

## Usage

```js
import { contentEncoding } from "popsicle-content-encoding";

const middleware = compose([contentEncoding(), transport()]);
```

Automatically populates `Accept-Encoding` based on node.js supported decompression algorithms, then decodes the matching response body. Does nothing if `Accept-Encoding` is already set.

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/popsicle-content-encoding.svg?style=flat
[npm-url]: https://npmjs.org/package/popsicle-content-encoding
[downloads-image]: https://img.shields.io/npm/dm/popsicle-content-encoding.svg?style=flat
[downloads-url]: https://npmjs.org/package/popsicle-content-encoding
[travis-image]: https://img.shields.io/travis/serviejs/popsicle-content-encoding.svg?style=flat
[travis-url]: https://travis-ci.org/serviejs/popsicle-content-encoding
[coveralls-image]: https://img.shields.io/coveralls/serviejs/popsicle-content-encoding.svg?style=flat
[coveralls-url]: https://coveralls.io/r/serviejs/popsicle-content-encoding?branch=master
