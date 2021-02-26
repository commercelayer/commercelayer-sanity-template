# Popsicle Cookie Jar

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Popsicle middleware for supporting cookies in node.js.

## Installation

```
npm install popsicle-cookie-jar --save
```

## Usage

```js
import { cookies, CookieJar } from "popsicle-cookie-jar";

const middleware = compose([cookies(), transport()]);
```

The only argument to `cookies` is an optional `CookieJar` instance. By default, it will create an in-memory instance for you.

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/popsicle-cookie-jar.svg?style=flat
[npm-url]: https://npmjs.org/package/popsicle-cookie-jar
[downloads-image]: https://img.shields.io/npm/dm/popsicle-cookie-jar.svg?style=flat
[downloads-url]: https://npmjs.org/package/popsicle-cookie-jar
[travis-image]: https://img.shields.io/travis/serviejs/popsicle-cookie-jar.svg?style=flat
[travis-url]: https://travis-ci.org/serviejs/popsicle-cookie-jar
[coveralls-image]: https://img.shields.io/coveralls/serviejs/popsicle-cookie-jar.svg?style=flat
[coveralls-url]: https://coveralls.io/r/serviejs/popsicle-cookie-jar?branch=master
