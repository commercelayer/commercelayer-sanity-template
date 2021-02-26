# Popsicle User Agent

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Popsicle middleware for setting a default `User-Agent` header.

## Installation

```
npm install popsicle-user-agent --save
```

## Usage

```js
import { userAgent } from "popsicle-user-agent";

const middleware = compose([userAgent(), transport()]);
```

The only argument is the argument to set as the `User-Agent`, defaults to `Popsicle`.

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/popsicle-user-agent.svg?style=flat
[npm-url]: https://npmjs.org/package/popsicle-user-agent
[downloads-image]: https://img.shields.io/npm/dm/popsicle-user-agent.svg?style=flat
[downloads-url]: https://npmjs.org/package/popsicle-user-agent
[travis-image]: https://img.shields.io/travis/serviejs/popsicle-user-agent.svg?style=flat
[travis-url]: https://travis-ci.org/serviejs/popsicle-user-agent
[coveralls-image]: https://img.shields.io/coveralls/serviejs/popsicle-user-agent.svg?style=flat
[coveralls-url]: https://coveralls.io/r/serviejs/popsicle-user-agent?branch=master
