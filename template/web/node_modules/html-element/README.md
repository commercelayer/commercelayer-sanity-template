# html-element

A simple HTMLElement shim on the server.

This is a partial implementation of HTMLElement, to get client-side templates (such as [hyperscript](https://github.com/dominictarr/hyperscript)) working in node!

The current implementation is fully compatible with [hyperscript](https://github.com/dominictarr/hyperscript).

### Upgrading from v1.x

As of v2.0.0 (Aug 2016), `html-element` no longer affects the global namespace by default. If you currently rely on `require('html-element')` to create globals such as `document` and `Element`, you should instead `require('html-element/global-shim')` when upgrading to v2.

For non-global usage, you can import objects directly from the main package, e.g.:
```javascript
var document = require('html-element').document;
```
or
```javascript
import { Element } from 'html-element';
```

## Supported methods

- createElement(nodeName)
- createTextNode(value)
- appendChild(node)
- replaceChild(node)
- removeChild(node)
- insertBefore(new, existing)
- toString()
- setAttribute(name, value)
- getAttribute(name)
- setProperty(name, value)
- getProperty(name)
- innerHTML()
- outerHTML()
- textContent()
- addEventListener(eventType, listenerFunc)
- removeEventListener(eventType, listenerFunc)
- dispatchEvent(event)

Setters update existing objects, otherwise create anew;

## Properties
- innerHTML
- outerHTML
- textContent
- attribute.value
- attribute.name
- everything else

## TODO / Missing features
- Your PR to make this a more accurate implementation


## License

MIT
