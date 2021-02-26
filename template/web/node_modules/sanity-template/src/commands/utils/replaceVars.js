const Entities = require('html-entities')
const {isPlainObject} = require('lodash')
const Mustache = require('mustache')
const path = require('path')

const entities = new Entities.AllHtmlEntities()

function deepRenderStrings(value, templateVars) {
  const name = typeof value
  if (name === 'string') {
    const renderedString = Mustache.render(value, templateVars, {}, ['<#<', '>#>'])
    return entities.decode(renderedString)
  }

  if (name === 'boolean' || name === 'number') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(item => deepRenderStrings(item, templateVars))
  }

  if (isPlainObject(value)) {
    const renderedObject = {}
    Object.keys(value).forEach(key => {
      renderedObject[key] = deepRenderStrings(value[key], templateVars)
    })
    return renderedObject
  }
}

function replaceVars(filePath, content, templateVars) {
  const isJson = path.extname(filePath) === '.json'
  if (isJson) {
    const renderedJson = deepRenderStrings(JSON.parse(content), templateVars)
    return JSON.stringify(renderedJson, null, 2)
  }

  return Mustache.render(content, templateVars, {}, ['<#<', '>#>'])
}

module.exports = {
  replaceVars
}
