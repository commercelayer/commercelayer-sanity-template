# picosanity

[![npm version](https://img.shields.io/npm/v/picosanity.svg?style=flat-square)](http://browsenpm.org/package/picosanity)[![Build Status](https://img.shields.io/travis/rexxars/picosanity/main.svg?style=flat-square)](https://travis-ci.org/rexxars/picosanity)[![npm bundle size](https://img.shields.io/bundlephobia/minzip/picosanity?style=flat-square)](https://bundlephobia.com/result?p=picosanity)

Tiny Sanity client alternative, if you only need to do queries and only need to support modern browsers.

## Targets

- Node.js >= 10
- Modern browsers (Edge >= 14, Chrome, Safari, Firefox etc)

## Installation

```bash
npm install --save picosanity
```

## Usage

```js
import PicoSanity from 'picosanity'

const client = new PicoSanity({
  projectId: 'myProjectId',
  dataset: 'myDataset',
  useCdn: true,
})

client
  .fetch('*[_type == $someType]', {someType: 'article'})
  .then((articles) => console.log(articles))
  .catch((err) => console.error('Oh noes: %s', err.message))
```

## UMD bundle

You can load this module as a UMD-bundle from unpkg - https://unpkg.com/picosanity  
If used in a global browser context, it will be available as `window.PicoSanity`

## License

MIT © [Espen Hovlandsdal](https://espen.codes/)
