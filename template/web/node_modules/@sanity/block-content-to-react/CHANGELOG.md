# Change Log

All notable changes will be documented in this file.

## 2.0.1 - 2018-07-09

### Added

- Add `renderContainerOnSingleChild` to force container to be rendered even on single-child results

## 2.0.0 - 2018-07-04

### BREAKING

The default list item serializer now calls the block serializer to render children, unless the node style is `normal`.

In other words: If a list item is marked as a heading, it would previously be rendered simply as `<li>Text</li>`, where it will now render as `<li><h1>Text</h1></li>`. Normal list items will render simply as `<li>Text</li>`.

This can be considered as a bugfix, but also a breaking change. Should you want the old behavior back, you can override the `listItem` serializer as below:

```js
const ListItemRenderer = props => <li>{props.children}</li>

<BlockContent
  blocks={input}
  serializers={{listItem: ListItemRenderer}}
/>
```
