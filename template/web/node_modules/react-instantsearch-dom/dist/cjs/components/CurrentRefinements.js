"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CurrentRefinements = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('CurrentRefinements');

var CurrentRefinements = function CurrentRefinements(_ref) {
  var items = _ref.items,
      canRefine = _ref.canRefine,
      refine = _ref.refine,
      translate = _ref.translate,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
  }, _react.default.createElement("ul", {
    className: cx('list', !canRefine && 'list--noRefinement')
  }, items.map(function (item) {
    return _react.default.createElement("li", {
      key: item.label,
      className: cx('item')
    }, _react.default.createElement("span", {
      className: cx('label')
    }, item.label), item.items ? item.items.map(function (nest) {
      return _react.default.createElement("span", {
        key: nest.label,
        className: cx('category')
      }, _react.default.createElement("span", {
        className: cx('categoryLabel')
      }, nest.label), _react.default.createElement("button", {
        className: cx('delete'),
        onClick: function onClick() {
          return refine(nest.value);
        }
      }, translate('clearFilter', nest)));
    }) : _react.default.createElement("span", {
      className: cx('category')
    }, _react.default.createElement("button", {
      className: cx('delete'),
      onClick: function onClick() {
        return refine(item.value);
      }
    }, translate('clearFilter', item))));
  })));
};

exports.CurrentRefinements = CurrentRefinements;

var itemPropTypes = _propTypes.default.arrayOf(_propTypes.default.shape({
  label: _propTypes.default.string.isRequired,
  value: _propTypes.default.func.isRequired,
  items: function items() {
    return itemPropTypes.apply(void 0, arguments);
  }
}));

CurrentRefinements.propTypes = {
  items: itemPropTypes.isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  refine: _propTypes.default.func.isRequired,
  translate: _propTypes.default.func.isRequired,
  className: _propTypes.default.string
};
CurrentRefinements.defaultProps = {
  className: ''
};

var _default = (0, _reactInstantsearchCore.translatable)({
  clearFilter: '✕'
})(CurrentRefinements);

exports.default = _default;