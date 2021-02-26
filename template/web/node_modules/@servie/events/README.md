# Events

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Bundle size][bundlephobia-image]](bundlephobia-url)

> Tiny type-safe event emitter.

## Installation

```
npm install @servie/events --save
```

## Usage

```ts
import { Emitter, once } from "@servie/events";

// Define an events interface using keys & argument tuples.
interface Events {
  test: [boolean];
  other: [string];
}

// Initialize an `Emitter` using your `Events` interface.
const events = new Emitter<Events>();

// Add or remove listeners.
const listener = (...args) => console.log(args);
events.on("test", listener);
events.off("test", listener);

// Emit an event.
events.emit("test", true);

// Listen to _all_ events, e.g. debugging.
const eachListener = ({ type, args }) => console.log(type, args);
events.each(eachListener);
events.none(eachListener);

// "Once" utility.
const onceListener = (...args) => console.log(args);
once(events, "test", onceListener);
```

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@servie/events.svg?style=flat
[npm-url]: https://npmjs.org/package/@servie/events
[downloads-image]: https://img.shields.io/npm/dm/@servie/events.svg?style=flat
[downloads-url]: https://npmjs.org/package/@servie/events
[travis-image]: https://img.shields.io/travis/serviejs/events.svg?style=flat
[travis-url]: https://travis-ci.org/serviejs/events
[coveralls-image]: https://img.shields.io/coveralls/serviejs/events.svg?style=flat
[coveralls-url]: https://coveralls.io/r/serviejs/events?branch=master
[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/@servie/events.svg
[bundlephobia-url]: https://bundlephobia.com/result?p=servie
