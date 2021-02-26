# Popsicle Transport XHR

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Popsicle transport for sending requests over `XMLHttpRequest`.

## Installation

```
npm install popsicle-transport-xhr --save
```

## Usage

```js
import { transport } from "popsicle-transport-xhr";

const req = new Request("/");
const res = await transport()(req, done);
```

### Transport Options

The `transport` function sends the Servie `Request` to a remote server.

- `type?: XMLHttpRequestResponseType` Override response type
- `withCredentials?: boolean` Enable `withCredentials`
- `overrideMimeType?: string` Override MIME type

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/popsicle-transport-xhr.svg?style=flat
[npm-url]: https://npmjs.org/package/popsicle-transport-xhr
[downloads-image]: https://img.shields.io/npm/dm/popsicle-transport-xhr.svg?style=flat
[downloads-url]: https://npmjs.org/package/popsicle-transport-xhr
[travis-image]: https://img.shields.io/travis/serviejs/popsicle-transport-xhr.svg?style=flat
[travis-url]: https://travis-ci.org/serviejs/popsicle-transport-xhr
[coveralls-image]: https://img.shields.io/coveralls/serviejs/popsicle-transport-xhr.svg?style=flat
[coveralls-url]: https://coveralls.io/r/serviejs/popsicle-transport-xhr?branch=master
