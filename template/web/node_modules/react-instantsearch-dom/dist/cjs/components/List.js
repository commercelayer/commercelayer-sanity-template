"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SearchBox = _interopRequireDefault(require("../components/SearchBox"));

var itemsPropType = _propTypes.default.arrayOf(_propTypes.default.shape({
  value: _propTypes.default.any,
  label: _propTypes.default.node.isRequired,
  items: function items() {
    return itemsPropType.apply(void 0, arguments);
  }
}));

var List =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(List, _Component);

  function List() {
    var _this;

    (0, _classCallCheck2.default)(this, List);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(List).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onShowMoreClick", function () {
      _this.setState(function (state) {
        return {
          extended: !state.extended
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getLimit", function () {
      var _this$props = _this.props,
          limit = _this$props.limit,
          showMoreLimit = _this$props.showMoreLimit;
      var extended = _this.state.extended;
      return extended ? showMoreLimit : limit;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetQuery", function () {
      _this.setState({
        query: ''
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderItem", function (item, resetQuery) {
      var itemHasChildren = item.items && Boolean(item.items.length);
      return _react.default.createElement("li", {
        key: item.key || item.label,
        className: _this.props.cx('item', item.isRefined && 'item--selected', item.noRefinement && 'item--noRefinement', itemHasChildren && 'item--parent')
      }, _this.props.renderItem(item, resetQuery), itemHasChildren && _react.default.createElement("ul", {
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

  (0, _createClass2.default)(List, [{
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

      return _react.default.createElement("button", {
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
      var noResults = items.length === 0 && this.state.query !== '' ? _react.default.createElement("div", {
        className: cx('noResults')
      }, translate('noResults')) : null;
      return _react.default.createElement("div", {
        className: cx('searchBox')
      }, _react.default.createElement(_SearchBox.default, {
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
      var rootClassName = (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className);

      if (items.length === 0) {
        return _react.default.createElement("div", {
          className: rootClassName
        }, searchBox);
      } // Always limit the number of items we show on screen, since the actual
      // number of retrieved items might vary with the `maxValuesPerFacet` config
      // option.


      return _react.default.createElement("div", {
        className: rootClassName
      }, searchBox, _react.default.createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items.slice(0, this.getLimit()).map(function (item) {
        return _this3.renderItem(item, _this3.resetQuery);
      })), this.renderShowMore());
    }
  }]);
  return List;
}(_react.Component);

(0, _defineProperty2.default)(List, "propTypes", {
  cx: _propTypes.default.func.isRequired,
  // Only required with showMore.
  translate: _propTypes.default.func,
  items: itemsPropType,
  renderItem: _propTypes.default.func.isRequired,
  selectItem: _propTypes.default.func,
  className: _propTypes.default.string,
  showMore: _propTypes.default.bool,
  limit: _propTypes.default.number,
  showMoreLimit: _propTypes.default.number,
  show: _propTypes.default.func,
  searchForItems: _propTypes.default.func,
  searchable: _propTypes.default.bool,
  isFromSearch: _propTypes.default.bool,
  canRefine: _propTypes.default.bool
});
(0, _defineProperty2.default)(List, "defaultProps", {
  className: '',
  isFromSearch: false
});
var _default = List;
exports.default = _default;