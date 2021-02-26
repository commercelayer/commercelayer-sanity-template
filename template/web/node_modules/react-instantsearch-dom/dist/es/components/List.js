import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SearchBox from '../components/SearchBox';
var itemsPropType = PropTypes.arrayOf(PropTypes.shape({
  value: PropTypes.any,
  label: PropTypes.node.isRequired,
  items: function items() {
    return itemsPropType.apply(void 0, arguments);
  }
}));

var List =
/*#__PURE__*/
function (_Component) {
  _inherits(List, _Component);

  function List() {
    var _this;

    _classCallCheck(this, List);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(List).call(this));

    _defineProperty(_assertThisInitialized(_this), "onShowMoreClick", function () {
      _this.setState(function (state) {
        return {
          extended: !state.extended
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getLimit", function () {
      var _this$props = _this.props,
          limit = _this$props.limit,
          showMoreLimit = _this$props.showMoreLimit;
      var extended = _this.state.extended;
      return extended ? showMoreLimit : limit;
    });

    _defineProperty(_assertThisInitialized(_this), "resetQuery", function () {
      _this.setState({
        query: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (item, resetQuery) {
      var itemHasChildren = item.items && Boolean(item.items.length);
      return React.createElement("li", {
        key: item.key || item.label,
        className: _this.props.cx('item', item.isRefined && 'item--selected', item.noRefinement && 'item--noRefinement', itemHasChildren && 'item--parent')
      }, _this.props.renderItem(item, resetQuery), itemHasChildren && React.createElement("ul", {
        className: _this.props.cx('list', 'list--child')
      }, item.items.slice(0, _this.getLimit()).map(function (child) {
        return _this.renderItem(child, item);
      })));
    });

    _this.state = {
      extended: false,
      query: ''
    };
    return _this;
  }

  _createClass(List, [{
    key: "renderShowMore",
    value: function renderShowMore() {
      var _this$props2 = this.props,
          showMore = _this$props2.showMore,
          translate = _this$props2.translate,
          cx = _this$props2.cx;
      var extended = this.state.extended;
      var disabled = this.props.limit >= this.props.items.length;

      if (!showMore) {
        return null;
      }

      return React.createElement("button", {
        disabled: disabled,
        className: cx('showMore', disabled && 'showMore--disabled'),
        onClick: this.onShowMoreClick
      }, translate('showMore', extended));
    }
  }, {
    key: "renderSearchBox",
    value: function renderSearchBox() {
      var _this2 = this;

      var _this$props3 = this.props,
          cx = _this$props3.cx,
          searchForItems = _this$props3.searchForItems,
          isFromSearch = _this$props3.isFromSearch,
          translate = _this$props3.translate,
          items = _this$props3.items,
          selectItem = _this$props3.selectItem;
      var noResults = items.length === 0 && this.state.query !== '' ? React.createElement("div", {
        className: cx('noResults')
      }, translate('noResults')) : null;
      return React.createElement("div", {
        className: cx('searchBox')
      }, React.createElement(SearchBox, {
        currentRefinement: this.state.query,
        refine: function refine(value) {
          _this2.setState({
            query: value
          });

          searchForItems(value);
        },
        focusShortcuts: [],
        translate: translate,
        onSubmit: function onSubmit(e) {
          e.preventDefault();
          e.stopPropagation();

          if (isFromSearch) {
            selectItem(items[0], _this2.resetQuery);
          }
        }
      }), noResults);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          cx = _this$props4.cx,
          items = _this$props4.items,
          className = _this$props4.className,
          searchable = _this$props4.searchable,
          canRefine = _this$props4.canRefine;
      var searchBox = searchable ? this.renderSearchBox() : null;
      var rootClassName = classNames(cx('', !canRefine && '-noRefinement'), className);

      if (items.length === 0) {
        return React.createElement("div", {
          className: rootClassName
        }, searchBox);
      } // Always limit the number of items we show on screen, since the actual
      // number of retrieved items might vary with the `maxValuesPerFacet` config
      // option.


      return React.createElement("div", {
        className: rootClassName
      }, searchBox, React.createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items.slice(0, this.getLimit()).map(function (item) {
        return _this3.renderItem(item, _this3.resetQuery);
      })), this.renderShowMore());
    }
  }]);

  return List;
}(Component);

_defineProperty(List, "propTypes", {
  cx: PropTypes.func.isRequired,
  // Only required with showMore.
  translate: PropTypes.func,
  items: itemsPropType,
  renderItem: PropTypes.func.isRequired,
  selectItem: PropTypes.func,
  className: PropTypes.string,
  showMore: PropTypes.bool,
  limit: PropTypes.number,
  showMoreLimit: PropTypes.number,
  show: PropTypes.func,
  searchForItems: PropTypes.func,
  searchable: PropTypes.bool,
  isFromSearch: PropTypes.bool,
  canRefine: PropTypes.bool
});

_defineProperty(List, "defaultProps", {
  className: '',
  isFromSearch: false
});

export default List;