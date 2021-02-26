# Throwback

[![NPM version](https://img.shields.io/npm/v/throwback.svg?style=flat)](https://npmjs.org/package/throwback)
[![NPM downloads](https://img.shields.io/npm/dm/throwback.svg?style=flat)](https://npmjs.org/package/throwback)
[![Build status](https://img.shields.io/travis/serviejs/throwback.svg?style=flat)](https://travis-ci.org/serviejs/throwback)
[![Test coverage](https://img.shields.io/coveralls/serviejs/throwback.svg?style=flat)](https://coveralls.io/r/serviejs/throwback?branch=master)

> Simple asynchronous middleware pattern.

## Installation

```
npm install throwback --save
```

## Usage

Compose asynchronous (promise-returning) functions.

```js
const { compose } = require("throwback");

const fn = compose([
  async function(ctx, next) {
    console.log(1);

    try {
      await next();
    } catch (err) {
      console.log("throwback", err);
    }

    console.log(4);
  },
  async function(ctx, next) {
    console.log(2);

    return next();
  }
]);

// Callback runs at the end of the stack, before
// the middleware bubbles back to the beginning.
fn({}, function(ctx) {
  console.log(3);

  ctx.status = 404;
});
```

**Tip:** In development (`NODE_ENV !== "production"`), `compose` will throw errors when you do something unexpected. In production, the faster non-error code paths are used.

### Example

Build a micro HTTP server!

```js
const { createServer } = require("http");
const finalhandler = require("finalhandler"); // Example only, not compatible with single `ctx` arg.
const { compose } = require("throwback");

const app = compose([
  function({ req, res }, next) {
    res.end("Hello world!");
  }
]);

createServer(function(req, res) {
  return app({ req, res }, finalhandler());
}).listen(3000);
```

## Use Cases

- HTTP requests (e.g. [`popsicle`](https://github.com/serviejs/popsicle))
- HTTP servers (e.g. [`servie`](https://github.com/serviejs/servie))
- Processing pipelines (e.g. [`scrappy`](https://github.com/blakeembrey/node-scrappy))

## Inspiration

Built for [`servie`](https://github.com/serviejs) and inspired by [`koa-compose`](https://github.com/koajs/compose).

## License

MIT
