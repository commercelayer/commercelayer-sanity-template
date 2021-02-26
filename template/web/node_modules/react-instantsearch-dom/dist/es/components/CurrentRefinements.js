import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
var cx = createClassNames('CurrentRefinements');
export var CurrentRefinements = function CurrentRefinements(_ref) {
  var items = _ref.items,
      canRefine = _ref.canRefine,
      refine = _ref.refine,
      translate = _ref.translate,
      className = _ref.className;
  return React.createElement("div", {
    className: classNames(cx('', !canRefine && '-noRefinement'), className)
  }, React.createElement("ul", {
    className: cx('list', !canRefine && 'list--noRefinement')
  }, items.map(function (item) {
    return React.createElement("li", {
      key: item.label,
      className: cx('item')
    }, React.createElement("span", {
      className: cx('label')
    }, item.label), item.items ? item.items.map(function (nest) {
      return React.createElement("span", {
        key: nest.label,
        className: cx('category')
      }, React.createElement("span", {
        className: cx('categoryLabel')
      }, nest.label), React.createElement("button", {
        className: cx('delete'),
        onClick: function onClick() {
          return refine(nest.value);
        }
      }, translate('clearFilter', nest)));
    }) : React.createElement("span", {
      className: cx('category')
    }, React.createElement("button", {
      className: cx('delete'),
      onClick: function onClick() {
        return refine(item.value);
      }
    }, translate('clearFilter', item))));
  })));
};
var itemPropTypes = PropTypes.arrayOf(PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.func.isRequired,
  items: function items() {
    return itemPropTypes.apply(void 0, arguments);
  }
}));
CurrentRefinements.propTypes = {
  items: itemPropTypes.isRequired,
  canRefine: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string
};
CurrentRefinements.defaultProps = {
  className: ''
};
export default translatable({
  clearFilter: '✕'
})(CurrentRefinements);