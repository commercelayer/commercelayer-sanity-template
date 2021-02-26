# block-content-to-react

Render an array of [block text](https://www.sanity.io/docs/schema-types/block-type) from Sanity with React or React Native.

## Installing

```
npm install --save @sanity/block-content-to-react
```

## Usage

```js
const React = require('react')
const ReactDOM = require('react-dom')
const BlockContent = require('@sanity/block-content-to-react')
const client = require('@sanity/client')({
  projectId: '<your project id>',
  dataset: '<some dataset>',
  useCdn: true
})

const serializers = {
  types: {
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    )
  }
}

client.fetch('*[_type == "article"][0]').then(article => {
  ReactDOM.render(
    <BlockContent blocks={article.body} serializers={serializers} />,
    document.getElementById('root')
  )
})
```

## PropTypes

- `className` - When more than one block is given, a container node has to be created. Passing a `className` will pass it on to the container. Note: see `renderContainerOnSingleChild`.
- `renderContainerOnSingleChild` - When a single block is given as input, the default behavior is to not render any container. If you always want to render the container, pass `true`.
- `serializers` - Specifies the React components to use for rendering content. Merged with default serializers.
- `serializers.types` - Serializers for block types, see example above
- `serializers.marks` - Serializers for marks - data that annotates a text child of a block. See example usage below.
- `serializers.list` - React component to use when rendering a list node
- `serializers.listItem` - React component to use when rendering a list item node
- `serializers.hardBreak` - React component to use when transforming newline characters to a hard break (`<br/>` by default, pass `false` to render newline character)
- `serializers.container` - Serializer for the container wrapping the blocks
- `imageOptions` - When encountering image blocks, this defines which query parameters to apply in order to control size/crop mode etc.

In addition, in order to render images without materializing the asset documents, you should also specify:

- `projectId` - The ID of your Sanity project.
- `dataset` - Name of the Sanity dataset containing the document that is being rendered.

## Examples

### Rendering custom marks

```js
const input = [{
  _type: 'block',
  children: [{
    _key: 'a1ph4',
    _type: 'span',
    marks: ['s0m3k3y'],
    text: 'Sanity'
  }],
  markDefs: [{
    _key: 's0m3k3y',
    _type: 'highlight',
    color: '#E4FC5B'
  }]
}]

const highlight = props => {
  return (
    <span style={{backgroundColor: props.mark.color}}>
      {props.children}
    </span>
  )
}

<BlockContent
  blocks={input}
  serializers={{marks: {highlight}}}
/>
```

### Specifying image options

```js
<BlockContent
  blocks={input}
  imageOptions={{w: 320, h: 240, fit: 'max'}}
  projectId="myprojectid"
  dataset="mydataset"
/>
```

### Customizing default serializer for `block`-type

```js
const BlockRenderer = props => {
  const style = props.node.style || 'normal'

  if (/^h\d/.test(style)) {
    const level = style.replace(/[^\d]/g, '')
    return <h2 className={`my-heading level-${level}`}>{props.children}</h2>
  }

  return style === 'blockquote'
    ? <blockquote className="my-block-quote">{props.children}</blockquote>
    : <p className="my-paragraph">{props.children}</p>
}

<BlockContent
  blocks={input}
  serializers={{types: {block: BlockRenderer}}}
/>
```

## Usage with React Native

React Native support is experimental, but should work. Built-in serializers render using React Native elements instead of HTML tags when React Native is detected, and serializers can be specified as you normally would.

Since there are fewer built-in elements in React Native, elements such as lists are implemented using plain (text) views, styled to look rougly like the HTML variant. You'll probably want to customize most of the serializers when using React Native, since styling is not handled in a cascading fashion.

## License

MIT-licensed. See LICENSE.
