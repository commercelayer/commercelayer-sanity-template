/**
 * Utils for HTML attributes
 * @module html-attributes
 */

// property to attribute names
var PROPS_TO_ATTRS = {
  'className': 'class',
  'htmlFor': 'for',
};

// map of attributes to the elements they affect
// see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
var HTML_ATTRIBUTES = {
  'accept': new Set([
    'form',
    'input',
  ]),

  'accept-charset': new Set([
    'form',
  ]),

  'accesskey': 'GLOBAL',

  'action': new Set([
    'form',
  ]),

  'align': new Set([
    'applet',
    'caption',
    'col',
    'colgroup',
    'hr',
    'iframe',
    'img',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'tr',
  ]),

  'alt': new Set([
    'applet',
    'area',
    'img',
    'input',
  ]),

  'async': new Set([
    'script',
  ]),

  'autocomplete': new Set([
    'form',
    'input',
  ]),

  'autofocus': new Set([
    'button',
    'input',
    'keygen',
    'select',
    'textarea',
  ]),

  'autoplay': new Set([
    'audio',
    'video',
  ]),

  'autosave': new Set([
    'input',
  ]),

  'bgcolor': new Set([
    'body',
    'col',
    'colgroup',
    'marquee',
    'table',
    'tbody',
    'tfoot',
    'td',
    'th',
    'tr',
  ]),

  'border': new Set([
    'img',
    'object',
    'table',
  ]),

  'buffered': new Set([
    'audio',
    'video',
  ]),

  'challenge': new Set([
    'keygen',
  ]),

  'charset': new Set([
    'meta',
    'script',
  ]),

  'checked': new Set([
    'command',
    'input',
  ]),

  'cite': new Set([
    'blockquote',
    'del',
    'ins',
    'q',
  ]),

  'class': 'GLOBAL',

  'code': new Set([
    'applet',
  ]),

  'codebase': new Set([
    'applet',
  ]),

  'color': new Set([
    'basefont',
    'font',
    'hr',
  ]),

  'cols': new Set([
    'textarea',
  ]),

  'colspan': new Set([
    'td',
    'th',
  ]),

  'content': new Set([
    'meta',
  ]),

  'contenteditable': 'GLOBAL',

  'contextmenu': 'GLOBAL',

  'controls': new Set([
    'audio',
    'video',
  ]),

  'coords': new Set([
    'area',
  ]),

  'data': new Set([
    'object',
  ]),

  'datetime': new Set([
    'del',
    'ins',
    'time',
  ]),

  'default': new Set([
    'track',
  ]),

  'defer': new Set([
    'script',
  ]),

  'dir': 'GLOBAL',

  'dirname': new Set([
    'input',
    'textarea',
  ]),

  'disabled': new Set([
    'button',
    'command',
    'fieldset',
    'input',
    'keygen',
    'optgroup',
    'option',
    'select',
    'textarea',
  ]),

  'download': new Set([
    'a',
    'area',
  ]),

  'draggable': 'GLOBAL',

  'dropzone': 'GLOBAL',

  'enctype': new Set([
    'form',
  ]),

  'for': new Set([
    'label',
    'output',
  ]),

  'form': new Set([
    'button',
    'fieldset',
    'input',
    'keygen',
    'label',
    'meter',
    'object',
    'output',
    'progress',
    'select',
    'textarea',
  ]),

  'formaction': new Set([
    'input',
    'button',
  ]),

  'headers': new Set([
    'td',
    'th',
  ]),

  'height': new Set([
    'canvas',
    'embed',
    'iframe',
    'img',
    'input',
    'object',
    'video',
  ]),

  'hidden': 'GLOBAL',

  'high': new Set([
    'meter',
  ]),

  'href': new Set([
    'a',
    'area',
    'base',
    'link',
  ]),

  'hreflang': new Set([
    'a',
    'area',
    'link',
  ]),

  'http-equiv': new Set([
    'meta',
  ]),

  'icon': new Set([
    'command',
  ]),

  'id': 'GLOBAL',

  'ismap': new Set([
    'img',
  ]),

  'itemprop': 'GLOBAL',

  'keytype': new Set([
    'keygen',
  ]),

  'kind': new Set([
    'track',
  ]),

  'label': new Set([
    'track',
  ]),

  'lang': 'GLOBAL',

  'language': new Set([
    'script',
  ]),

  'list': new Set([
    'input',
  ]),

  'loop': new Set([
    'audio',
    'bgsound',
    'marquee',
    'video',
  ]),

  'low': new Set([
    'meter',
  ]),

  'manifest': new Set([
    'html',
  ]),

  'max': new Set([
    'input',
    'meter',
    'progress',
  ]),

  'maxlength': new Set([
    'input',
    'textarea',
  ]),

  'maxlength': new Set([
    'input',
    'textarea',
  ]),

  'media': new Set([
    'a',
    'area',
    'link',
    'source',
    'style',
  ]),

  'method': new Set([
    'form',
  ]),

  'min': new Set([
    'input',
    'meter',
  ]),

  'multiple': new Set([
    'input',
    'select',
  ]),

  'muted': new Set([
    'video',
  ]),

  'name': new Set([
    'button',
    'form',
    'fieldset',
    'iframe',
    'input',
    'keygen',
    'object',
    'output',
    'select',
    'textarea',
    'map',
    'meta',
    'param',
  ]),

  'novalidate': new Set([
    'form',
  ]),

  'open': new Set([
    'details',
  ]),

  'optimum': new Set([
    'meter',
  ]),

  'pattern': new Set([
    'input',
  ]),

  'ping': new Set([
    'a',
    'area',
  ]),

  'placeholder': new Set([
    'input',
    'textarea',
  ]),

  'poster': new Set([
    'video',
  ]),

  'preload': new Set([
    'audio',
    'video',
  ]),

  'radiogroup': new Set([
    'command',
  ]),

  'readonly': new Set([
    'input',
    'textarea',
  ]),

  'rel': new Set([
    'a',
    'area',
    'link',
  ]),

  'required': new Set([
    'input',
    'select',
    'textarea',
  ]),

  'reversed': new Set([
    'ol',
  ]),

  'rows': new Set([
    'textarea',
  ]),

  'rowspan': new Set([
    'td',
    'th',
  ]),

  'sandbox': new Set([
    'iframe',
  ]),

  'scope': new Set([
    'th',
  ]),

  'scoped': new Set([
    'style',
  ]),

  'seamless': new Set([
    'iframe',
  ]),

  'selected': new Set([
    'option',
  ]),

  'shape': new Set([
    'a',
    'area',
  ]),

  'size': new Set([
    'input',
    'select',
  ]),

  'sizes': new Set([
    'img',
    'link',
    'source',
  ]),

  'span': new Set([
    'col',
    'colgroup',
  ]),

  'spellcheck': 'GLOBAL',

  'src': new Set([
    'audio',
    'embed',
    'iframe',
    'img',
    'input',
    'script',
    'source',
    'track',
    'video',
  ]),

  'srcdoc': new Set([
    'iframe',
  ]),

  'srclang': new Set([
    'track',
  ]),

  'srcset': new Set([
    'img',
  ]),

  'start': new Set([
    'ol',
  ]),

  'step': new Set([
    'input',
  ]),

  'style': 'GLOBAL',

  'summary': new Set([
    'table',
  ]),

  'tabindex': 'GLOBAL',

  'target': new Set([
    'a',
    'area',
    'base',
    'form',
  ]),

  'title': 'GLOBAL',

  'type': new Set([
    'button',
    'input',
    'command',
    'embed',
    'object',
    'script',
    'source',
    'style',
    'menu',
  ]),

  'usemap': new Set([
    'img',
    'input',
    'object',
  ]),

  'value': new Set([
    'button',
    'option',
    'input',
    'li',
    'meter',
    'progress',
    'param',
  ]),

  'width': new Set([
    'canvas',
    'embed',
    'iframe',
    'img',
    'input',
    'object',
    'video',
  ]),

  'wrap': new Set([
    'textarea',
  ]),
};

function isStandardAttribute(attrName, tagName) {
  tagName = tagName.toLowerCase();
  var attr = HTML_ATTRIBUTES[attrName.toLowerCase()];
  return !!attr && (
    attr === 'GLOBAL' ||
    attr.has(tagName)
  );
}

function propToAttr(prop) {
  return PROPS_TO_ATTRS[prop] || prop;
}

module.exports = {
  isStandardAttribute: isStandardAttribute,
  propToAttr: propToAttr,
};
