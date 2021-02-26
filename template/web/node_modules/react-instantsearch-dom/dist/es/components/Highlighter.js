import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export var Highlight = function Highlight(_ref) {
  var cx = _ref.cx,
      value = _ref.value,
      highlightedTagName = _ref.highlightedTagName,
      isHighlighted = _ref.isHighlighted,
      nonHighlightedTagName = _ref.nonHighlightedTagName;
  var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
  var className = isHighlighted ? 'highlighted' : 'nonHighlighted';
  return React.createElement(TagName, {
    className: cx(className)
  }, value);
};
Highlight.propTypes = {
  cx: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  isHighlighted: PropTypes.bool.isRequired,
  highlightedTagName: PropTypes.string.isRequired,
  nonHighlightedTagName: PropTypes.string.isRequired
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
  return React.createElement("span", {
    className: classNames(cx(''), className)
  }, parsedHighlightedValue.map(function (item, i) {
    if (Array.isArray(item)) {
      var isLast = i === parsedHighlightedValue.length - 1;
      return React.createElement("span", {
        key: i
      }, item.map(function (element, index) {
        return React.createElement(Highlight, {
          cx: cx,
          key: index,
          value: element.value,
          highlightedTagName: tagName,
          nonHighlightedTagName: nonHighlightedTagName,
          isHighlighted: element.isHighlighted
        });
      }), !isLast && React.createElement("span", {
        className: cx('separator')
      }, separator));
    }

    return React.createElement(Highlight, {
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
  cx: PropTypes.func.isRequired,
  hit: PropTypes.object.isRequired,
  attribute: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  highlight: PropTypes.func.isRequired,
  highlightProperty: PropTypes.string.isRequired,
  tagName: PropTypes.string,
  nonHighlightedTagName: PropTypes.string,
  className: PropTypes.string,
  separator: PropTypes.node
};
Highlighter.defaultProps = {
  tagName: 'em',
  nonHighlightedTagName: 'span',
  className: '',
  separator: ', '
};
export default Highlighter;