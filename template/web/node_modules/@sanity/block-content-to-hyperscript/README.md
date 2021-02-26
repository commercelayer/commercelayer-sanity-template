# block-content-to-hyperscript

Render an array of [block text](https://www.sanity.io/docs/schema-types/block-type) from Sanity with [HyperScript](https://github.com/hyperhype/hyperscript).

## Installing

```
npm install --save @sanity/block-content-to-hyperscript
```

## Usage

```js
const h = require('hyperscript')
const blocksToHyperScript = require('@sanity/block-content-to-hyperscript')
const client = require('@sanity/client')({
  projectId: '<your project id>',
  dataset: '<some dataset>',
  useCdn: true
})

const serializers = {
  types: {
    code: props => h('pre', {className: props.node.language}, h('code', props.node.code))
  }
}

client.fetch('*[_type == "article"][0]').then(article => {
  const el = blocksToHyperScript({
    blocks: article.body,
    serializers: serializers
  })

  document.getElementById('root').appendChild(el)
})
```

## Options

* `className` - When more than one block is given, a container node has to be created. Passing a `className` will pass it on to the container. Note: see `renderContainerOnSingleChild`.
* `renderContainerOnSingleChild` - When a single block is given as input, the default behavior is to not render any container. If you always want to render the container, pass `true`.
* `serializers` - Specifies the functions to use for rendering content. Merged with default serializers.
* `serializers.types` - Serializers for block types, see example above
* `serializers.marks` - Serializers for marks - data that annotates a text child of a block. See example usage below.
* `serializers.list` - Function to use when rendering a list node
* `serializers.listItem` - Function to use when rendering a list item node
* `serializers.hardBreak` - Function to use when transforming newline characters to a hard break (default: `<br/>`, pass `false` to render newline character)
* `serializers.container` - Serializer for the container wrapping the blocks
* `imageOptions` - When encountering image blocks, this defines which query parameters to apply in order to control size/crop mode etc.

In addition, in order to render images without materializing the asset documents, you should also specify:

* `projectId` - The ID of your Sanity project.
* `dataset` - Name of the Sanity dataset containing the document that is being rendered.

## Examples

### Rendering custom marks

```js
const input = [
  {
    _type: 'block',
    children: [
      {
        _key: 'a1ph4',
        _type: 'span',
        marks: ['s0m3k3y'],
        text: 'Sanity'
      }
    ],
    markDefs: [
      {
        _key: 's0m3k3y',
        _type: 'highlight',
        color: '#E4FC5B'
      }
    ]
  }
]

const highlight = props => h('span', {style: {backgroundColor: props.mark.color}}, props.children)

const content = blocksToHyperScript({
  blocks: input,
  serializers: {marks: {highlight}}
})
```

### Specifying image options

```js
blocksToHyperScript({
  blocks: input,
  imageOptions: {w: 320, h: 240, fit: 'max'},
  projectId: 'myprojectid',
  dataset: 'mydataset'
})
```

### Customizing default serializer for `block`-type

```js
const BlockRenderer = props => {
  const style = props.node.style || 'normal'

  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '')
    return h('h2', {className: `my-heading level-${level}`}, props.children)
  }

  return style === 'blockquote'
    ? h('blockquote', {className: 'my-block-quote'}, props.children)
    : h('p', {className: 'my-paragraph'}, props.children)
}

blocksToHyperScript({
  blocks: input,
  serializers: {types: {block: BlockRenderer}}
})
```

## License

MIT-licensed. See LICENSE.
