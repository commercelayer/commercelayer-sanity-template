/* eslint-disable id-length, max-len */
const React = require('react')
const ReactDOM = require('react-dom/server')
const runTests = require('@sanity/block-content-tests')
const BlockContent = require('../../src/BlockContent')
const reactTestRenderer = require('react-test-renderer')

const h = React.createElement
const getImageUrl = BlockContent.getImageUrl
const render = props => ReactDOM.renderToStaticMarkup(h(BlockContent, props))
const normalize = html =>
  html.replace(/ style="(.*?)"/g, (match, styleProps) => {
    const style = styleProps.replace(/;$/g, '')
    return ` style="${style}"`
  })

runTests({render, h, normalize, getImageUrl})

test('renders empty block with react proptype error', () => {
  expect(render({})).toMatchSnapshot()
})

test('renders uses empty array instead of undefined/null blocks prop', () => {
  expect(render({blocks: undefined})).toMatchSnapshot()
  expect(render({blocks: null})).toMatchSnapshot()
})

test('can reuse default serializers', () => {
  const input = [
    {
      _key: 'meh',
      _type: 'block',
      markDefs: [],
      style: 'normal',
      children: [
        {
          _key: 'zing',
          _type: 'span',
          marks: ['em'],
          text: 'Plain text.'
        }
      ]
    },
    {
      _key: 'blah',
      _type: 'block',
      markDefs: [],
      style: 'blockquote',
      children: [
        {
          _key: 'moop',
          _type: 'span',
          marks: [],
          text: 'Some quote'
        }
      ]
    }
  ]

  const block = props => {
    if (props.node.style !== 'blockquote') {
      return BlockContent.defaultSerializers.types.block(props)
    }

    return React.createElement(
      'blockquote',
      {className: 'my-quote'},
      props.node.children.map(child => child.text)
    )
  }

  expect(render({blocks: input, serializers: {types: {block}}})).toMatchSnapshot()
})

test('should reuse serializers', () => {
  const block = {
    _key: '58cf8aa1fc74',
    _type: 'sometype',
    something: {someProperty: 'someValue'}
  }

  let numMounts = 0
  class RootComponent extends React.Component {
    constructor() {
      super()
      this.serializers = {
        types: {
          sometype: class SometypeComponent extends React.Component {
            // eslint-disable-next-line class-methods-use-this
            componentDidMount() {
              numMounts += 1
            }

            render() {
              return React.createElement('div', {}, `Hello ${this.props.msg}`)
            }
          }
        }
      }
    }

    render() {
      return React.createElement(BlockContent, {
        serializers: this.serializers,
        blocks: [block],
        msg: this.props.msg
      })
    }
  }

  const element = React.createElement(RootComponent, {msg: 'there'}, null)
  const renderer = reactTestRenderer.create(element)
  renderer.update(React.createElement(RootComponent, {msg: 'you'}, null))
  expect(numMounts).toBe(1)
})
