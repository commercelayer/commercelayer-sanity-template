# ![Servie](https://cdn.rawgit.com/serviejs/servie/master/logo.svg)

[![NPM version](https://img.shields.io/npm/v/servie.svg)](https://npmjs.org/package/servie)
[![NPM downloads](https://img.shields.io/npm/dm/servie.svg)](https://npmjs.org/package/servie)
[![Build status](https://img.shields.io/travis/serviejs/servie.svg)](https://travis-ci.org/serviejs/servie)
[![Test coverage](https://img.shields.io/coveralls/serviejs/servie.svg)](https://coveralls.io/r/serviejs/servie?branch=master)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/servie.svg)](https://bundlephobia.com/result?p=servie)

> Standard, framework-agnostic HTTP interfaces for JavaScript servers and clients.

## Installation

```
npm install servie --save
```

## Usage

- [`throwback`](https://github.com/serviejs/throwback) Compose middleware functions into a single function
- [`popsicle`](https://github.com/serviejs/popsicle) HTTP request library for node.js and browsers
- [`servie-lambda`](https://github.com/serviejs/servie-lambda) Servie transport layer for AWS Lambda
- [`servie-http`](https://github.com/serviejs/servie-http) Servie transport layer for node.js HTTP
- [`get-body`](https://github.com/serviejs/get-body) General body parser for forms, JSON and text
- [`servie-cors`](https://github.com/serviejs/servie-cors) CORS middleware for Servie
- [`servie-route`](https://github.com/serviejs/servie-route) Routing middleware for Servie
- [`servie-mount`](https://github.com/serviejs/servie-mount) Mount Servie middleware on a path prefix
- [`servie-compat-http`](https://github.com/serviejs/servie-compat-http) Mimic node.js HTTP using Servie
- [`servie-redirect`](https://github.com/serviejs/servie-redirect) Create response objects for redirection
- [`servie-cookie-store`](https://github.com/serviejs/servie-cookie-store) API for managing client-side cookies
- [`servie-errorhandler`](https://github.com/serviejs/servie-errorhandler) Standard error handler for transport layers
- [`servie-finalhandler`](https://github.com/serviejs/servie-finalhandler) Standard final handler for transport layers
- [`http-errors`](https://github.com/jshttp/http-errors) Create HTTP errors
- [`boom`](https://github.com/hapijs/boom) HTTP-friendly error objects
- [`consolidate`](https://github.com/tj/consolidate.js) Template rendering

```ts
import { Body, Request, Response, Headers, AbortController } from "servie";
```

> Servie is a universal package, meaning node.js and browsers are supported without needing configuration. This means the primary endpoint requires some `dom` types in TypeScript. When in a node.js, or browser, only environment, prefer importing `servie/dist/{node,browser}` instead.

### `Body`

> Base HTTP class shared between `Request` and `Response`.

```ts
new Body(body, headers);
```

#### Body

Supported body types, depending on environment:

- Node.js - `string | Buffer | ArrayBuffer | Readable | null | undefined`
- Browser - `string | ArrayBuffer | ReadableStream | null | undefined`

#### Properties and Methods

- `bodyUsed` Boolean whether the body is already consumed
- `text()` Returns the body as a `Promise<string>`
- `json()` Returns the body with `JSON.parse` as `Promise<any>`
- `arrayBuffer()` Returns the body as a `Promise<ArrayBuffer>`
- `clone()` Clones an unconsumed body
- `destroy()` Consumes and destroys the body

### `Request`

> HTTP class for modelling a `Request`, extends `Body`.

```ts
new Request(input [, init]);
```

#### Input

A URL string or another `Request` instance to clone from.

#### Init

- `method?` HTTP request method.
- `body?` Any support body types.
- `signal?` A signal from an `AbortController`.
- `headers?` A map, list of tuples, or `Header` instance to initialize from.
- `trailer?` A promise resolve to a support header initialization types (above).

#### Properties and Methods

- `url` Requested url string
- `method` Requested method string
- `signal` Signal event emitter
- `headers` A [`Headers`](#headers) instance
- `trailer` A [`Promise<Headers>`](#headers) instance
- `clone()` Clones the request into a new instance

### `Response`

> HTTP class for modelling a `Response`, extends `Body`.

```ts
new Response([body [, init]]);
```

#### Body

One of the support body types (above).

#### Init

- `status?` The numeric HTTP response status code
- `statusText?` The HTTP response status text

#### Properties and Methods

- `status` The numeric HTTP response status code
- `statusText` The HTTP response status text
- `ok` Boolean indicates successful response (`status` between 200 and 299)
- `headers` A [`Headers`](#headers) instance
- `trailer` A [`Promise<Headers>`](#headers) instance
- `clone()` Clones the response into a new instance

### `Headers`

> Map representation of HTTP headers.

```ts
new Headers([init]);
```

#### Init

Initialize headers from `Iterable<HeaderTuple>`, a `HeadersObject` or an existing `Headers` instance.

#### Methods

- `set(name: string, value: string | string[]): void` Set a HTTP header by overriding case-insensitive headers of the same name
- `append(name: string, value: string | string[]): void` Append a HTTP header
- `get(name: string): string | undefined` Retrieve a case-insensitive HTTP header
- `getAll(name: string): string[]` Retrieve a list of matching case-insensitive HTTP headers
- `has(name: string): boolean` Check if a case-insensitive header is already set
- `delete(name: string): void` Delete a case-insensitive header
- `asObject(): HeadersObject` Return the lower-cased headers as a plain object
- `extend(obj: HeadersInit): this` Extends the current headers with an object
- `keys()` Iterable of the available header names
- `values()` Iterable of header values
- `entries()` Iterable of headers as `[key, value]`
- `clear()` Clears the headers instance
- `clone()` Clones the `Headers` instance

### `AbortController`

> Simple controller for aborting a `Request` instance.

```ts
new AbortController();
```

#### Properties and Methods

- `signal` A [`Signal`](#signal) instance to pass to a [`Request`](#request)
- `abort()` Used to abort any listening requests through the `signal`

### `Signal`

> Tiny [event emitter](https://github.com/serviejs/events) for communicating during a request.

#### Methods

- `aborted` Boolean indicating whether the request is aborted
- `on(type, fn)` Attach an event listener to an event type
- `off(type, fn)` Remove an event listener from an event type
- `each(fn)` Attach an event listener for all events
- `none(fn)` Remove a global event listener
- `emit(type, ...args)` Emit an event to all listeners

#### Standard Events

- `abort` The request has been aborted
- `requestBytes` Emitted on request progress with current bytes
- `requestEnded` The request has ended
- `requestStarted` The request has been started
- `responseBytes` Emitted on response progress with current bytes
- `responseEnded` The response has ended
- `responseStarted` The response has started

Plugins can emit new types of events.

## Implementation

If you're building the transports for Servie, there are some life cycle events you need to be aware of:

1. Listen to the `error` event on `signal` for errors
2. Listen to the `abort` event on `signal` to destroy the connection
3. Resolve `trailer` promise and append to HTTP request or response
4. There are some existing built-in type-safe events in `SignalEvents` you can support

## JavaScript

This module is designed for ES2017 environments and published with [TypeScript](https://github.com/Microsoft/TypeScript) definitions on NPM.

## License

Apache 2.0
