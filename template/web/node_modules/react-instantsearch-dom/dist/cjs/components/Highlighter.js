"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Highlight = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var Highlight = function Highlight(_ref) {
  var cx = _ref.cx,
      value = _ref.value,
      highlightedTagName = _ref.highlightedTagName,
      isHighlighted = _ref.isHighlighted,
      nonHighlightedTagName = _ref.nonHighlightedTagName;
  var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
  var className = isHighlighted ? 'highlighted' : 'nonHighlighted';
  return _react.default.createElement(TagName, {
    className: cx(className)
  }, value);
};

exports.Highlight = Highlight;
Highlight.propTypes = {
  cx: _propTypes.default.func.isRequired,
  value: _propTypes.default.string.isRequired,
  isHighlighted: _propTypes.default.bool.isRequired,
  highlightedTagName: _propTypes.default.string.isRequired,
  nonHighlightedTagName: _propTypes.default.string.isRequired
};

var Highlighter = function Highlighter(_ref2) {
  var cx = _ref2.cx,
      hit = _ref2.hit,
      attribute = _ref2.attribute,
      highlight = _ref2.highlight,
      highlightProperty = _ref2.highlightProperty,
      tagName = _ref2.tagName,
      nonHighlightedTagName = _ref2.nonHighlightedTagName,
      separator = _ref2.separator,
      className = _ref2.className;
  var parsedHighlightedValue = highlight({
    hit: hit,
    attribute: attribute,
    highlightProperty: highlightProperty
  });
  return _react.default.createElement("span", {
    className: (0, _classnames.default)(cx(''), className)
  }, parsedHighlightedValue.map(function (item, i) {
    if (Array.isArray(item)) {
      var isLast = i === parsedHighlightedValue.length - 1;
      return _react.default.createElement("span", {
        key: i
      }, item.map(function (element, index) {
        return _react.default.createElement(Highlight, {
          cx: cx,
          key: index,
          value: element.value,
          highlightedTagName: tagName,
          nonHighlightedTagName: nonHighlightedTagName,
          isHighlighted: element.isHighlighted
        });
      }), !isLast && _react.default.createElement("span", {
        className: cx('separator')
      }, separator));
    }

    return _react.default.createElement(Highlight, {
      cx: cx,
      key: i,
      value: item.value,
      highlightedTagName: tagName,
      nonHighlightedTagName: nonHighlightedTagName,
      isHighlighted: item.isHighlighted
    });
  }));
};

Highlighter.propTypes = {
  cx: _propTypes.default.func.isRequired,
  hit: _propTypes.default.object.isRequired,
  attribute: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]).isRequired,
  highlight: _propTypes.default.func.isRequired,
  highlightProperty: _propTypes.default.string.isRequired,
  tagName: _propTypes.default.string,
  nonHighlightedTagName: _propTypes.default.string,
  className: _propTypes.default.string,
  separator: _propTypes.default.node
};
Highlighter.defaultProps = {
  tagName: 'em',
  nonHighlightedTagName: 'span',
  className: '',
  separator: ', '
};
var _default = Highlighter;
exports.default = _default;