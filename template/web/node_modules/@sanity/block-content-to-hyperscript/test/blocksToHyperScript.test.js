/* eslint-disable id-length, max-len */
const runTests = require('@sanity/block-content-tests')
const internals = require('../src/internals')
const blocksToHyperScript = require('../src')
const getSerializers = require('../src/serializers')

const h = blocksToHyperScript.renderNode
const getImageUrl = blocksToHyperScript.getImageUrl
const {defaultSerializers, serializeSpan} = getSerializers(h)
const normalize = html =>
  html
    .replace(/<br(.*?)\/>/g, '<br$1>')
    .replace(/<img(.*?)\/>/g, '<img$1>')
    .replace(/&quot;/g, '"')
    .replace(/&#x(\d+);/g, (match, code) => {
      return String.fromCharCode(parseInt(code, 16))
    })
    .replace(/ style="(.*?)"/g, (match, styleProps) => {
      const style = styleProps.replace(/:(\S)/g, ': $1')
      return ` style="${style}"`
    })

const fixture = [
  {
    _type: 'block',
    _key: 'foo',
    children: [
      {
        _key: 'bar',
        _type: 'span',
        marks: [],
        text: 'Test',
        markDefs: [],
        style: 'normal'
      }
    ]
  }
]

const render = options => {
  const rootNode = blocksToHyperScript(options)
  return rootNode.outerHTML || rootNode
}

runTests({render, h, normalize, getImageUrl})

describe('internals', () => {
  test('exposes blocksToNodes() on internals', () => {
    const node = internals.blocksToNodes(h, {blocks: fixture}, defaultSerializers, serializeSpan)
    expect(node.outerHTML).toEqual('<p>Test</p>')
  })

  test('exposes blocksToNodes() in legacy mode on internals', () => {
    const node = internals.blocksToNodes(h, {blocks: fixture})
    expect(node.outerHTML).toEqual('<p>Test</p>')
  })

  test('exposes getSerializers() on internals', () => {
    const serializers = internals.getSerializers(h)
    expect(serializers.serializeSpan('hei', serializers.defaultSerializers, 0)).toEqual('hei')
  })

  test('exposes getImageUrl() on internals', () => {
    const options = {imageOptions: {w: 320, h: 240}}
    const url = internals.getImageUrl({
      node: {asset: {url: 'https://foo.bar.baz/img.png'}},
      options
    })

    expect(url).toEqual('https://foo.bar.baz/img.png?w=320&h=240')
  })

  test('exposes mergeSerializers() on internals', () => {
    const serializers = internals.mergeSerializers(defaultSerializers, {})
    expect(Object.keys(serializers)).toEqual(Object.keys(defaultSerializers))
  })

  test('throws on missing projectId/dataset when encountering images', () => {
    expect(() => {
      render({
        blocks: [
          {
            _type: 'image',
            _key: 'd234a4fa317a',
            asset: {
              _type: 'reference',
              _ref: 'image-YiOKD0O6AdjKPaK24WtbOEv0-3456x2304-jpg'
            }
          }
        ]
      })
    }).toThrow(/block-content-image-materializing/)
  })

  test('treats text spans without marks as text spans', () => {
    expect(
      render({
        blocks: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Rush'
              }
            ]
          }
        ]
      })
    ).toEqual('<p>Rush</p>')
  })
})
