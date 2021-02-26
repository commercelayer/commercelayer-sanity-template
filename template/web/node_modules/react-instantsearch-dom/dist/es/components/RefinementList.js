import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
import Highlight from '../widgets/Highlight';
import List from './List';
var cx = createClassNames('RefinementList');

var RefinementList =
/*#__PURE__*/
function (_Component) {
  _inherits(RefinementList, _Component);

  function RefinementList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RefinementList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RefinementList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      query: ''
    });

    _defineProperty(_assertThisInitialized(_this), "selectItem", function (item, resetQuery) {
      resetQuery();

      _this.props.refine(item.value);
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (item, resetQuery) {
      var label = _this.props.isFromSearch ? React.createElement(Highlight, {
        attribute: "label",
        hit: item
      }) : item.label;
      return React.createElement("label", {
        className: cx('label')
      }, React.createElement("input", {
        className: cx('checkbox'),
        type: "checkbox",
        checked: item.isRefined,
        onChange: function onChange() {
          return _this.selectItem(item, resetQuery);
        }
      }), React.createElement("span", {
        className: cx('labelText')
      }, label), ' ', React.createElement("span", {
        className: cx('count')
      }, item.count.toLocaleString()));
    });

    return _this;
  }

  _createClass(RefinementList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          translate = _this$props.translate,
          items = _this$props.items,
          showMore = _this$props.showMore,
          limit = _this$props.limit,
          showMoreLimit = _this$props.showMoreLimit,
          isFromSearch = _this$props.isFromSearch,
          searchForItems = _this$props.searchForItems,
          searchable = _this$props.searchable,
          canRefine = _this$props.canRefine,
          className = _this$props.className;
      return React.createElement(List, {
        renderItem: this.renderItem,
        selectItem: this.selectItem,
        cx: cx,
        translate: translate,
        items: items,
        showMore: showMore,
        limit: limit,
        showMoreLimit: showMoreLimit,
        isFromSearch: isFromSearch,
        searchForItems: searchForItems,
        searchable: searchable,
        canRefine: canRefine,
        className: className,
        query: this.state.query
      });
    }
  }]);

  return RefinementList;
}(Component);

_defineProperty(RefinementList, "propTypes", {
  translate: PropTypes.func.isRequired,
  refine: PropTypes.func.isRequired,
  searchForItems: PropTypes.func.isRequired,
  searchable: PropTypes.bool,
  createURL: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    count: PropTypes.number.isRequired,
    isRefined: PropTypes.bool.isRequired
  })),
  isFromSearch: PropTypes.bool.isRequired,
  canRefine: PropTypes.bool.isRequired,
  showMore: PropTypes.bool,
  limit: PropTypes.number,
  showMoreLimit: PropTypes.number,
  transformItems: PropTypes.func,
  className: PropTypes.string
});

_defineProperty(RefinementList, "defaultProps", {
  className: ''
});

export default translatable({
  showMore: function showMore(extended) {
    return extended ? 'Show less' : 'Show more';
  },
  noResults: 'No results',
  submit: null,
  reset: null,
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…'
})(RefinementList);