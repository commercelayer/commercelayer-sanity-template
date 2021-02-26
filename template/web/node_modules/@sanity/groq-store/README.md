# @sanity/groq-store

[![npm version](https://img.shields.io/npm/v/@sanity/groq-store.svg?style=flat-square)](http://browsenpm.org/package/@sanity/groq-store)[![Build Status](https://img.shields.io/travis/sanity-io/groq-store/master.svg?style=flat-square)](https://travis-ci.org/sanity-io/groq-store)![npm bundle size](https://img.shields.io/bundlephobia/minzip/@sanity/groq-store?style=flat-square)

In-memory GROQ store. Streams all available documents from Sanity into an in-memory database and allows you to query them there.

## Targets

- Node.js >= 10
- Modern browsers (Edge >= 14, Chrome, Safari, Firefox etc)

## Caveats

- Streams _entire_ dataset to memory, so generally not recommended for large datasets
- Does not work with tokens in browser (currently)

## Installation

```bash
npm install --save @sanity/groq-store
```

## Usage

```js
import {groqStore, groq} from '@sanity/groq-store'

const store = groqStore({
  projectId: 'abc123',
  dataset: 'blog',

  // Keep dataset up to date with remote changes. Default: false
  listen: true,

  // "Replaces" published documents with drafts, if available.
  // Note that document IDs will not reflect draft status, currently
  overlayDrafts: true,

  // Optional token, if you want to receive drafts, or read data from private datasets
  // NOTE: Does _not_ work in browsers (yet)
  token: 'someAuthToken',

  // Optional limit on number of documents, to prevent using too much memory unexpectedly
  // Throws on the first operation (query, retrieval, subscription) if reaching this limit.
  documentLimit: 10000,
})

store.query(groq`*[_type == "author"]`).then((docs) => {
  console.log(docs)
})

store.getDocument('grrm').then((grrm) => {
  console.log(grrm)
})

store.getDocuments(['grrm', 'jrrt']).then(([grrm, jrrt]) => {
  console.log(grrm, jrrt)
})

const sub = store.subscribe(
  groq`*[_type == $type][] {name}`, // Query
  {type: 'author'}, // Params
  (err, result) => {
    if (err) {
      console.error('Oh no, an error:', err)
      return
    }

    console.log('Result:', result)
  }
)

// Later, to close subscription:
sub.unsubscribe()

// Later, to close listener:
store.close()
```

## License

MIT © [Sanity.io](https://www.sanity.io/)
