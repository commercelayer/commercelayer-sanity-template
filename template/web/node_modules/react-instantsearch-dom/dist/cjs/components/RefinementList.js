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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var _Highlight = _interopRequireDefault(require("../widgets/Highlight"));

var _List = _interopRequireDefault(require("./List"));

var cx = (0, _utils.createClassNames)('RefinementList');

var RefinementList =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RefinementList, _Component);

  function RefinementList() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RefinementList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RefinementList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      query: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectItem", function (item, resetQuery) {
      resetQuery();

      _this.props.refine(item.value);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderItem", function (item, resetQuery) {
      var label = _this.props.isFromSearch ? _react.default.createElement(_Highlight.default, {
        attribute: "label",
        hit: item
      }) : item.label;
      return _react.default.createElement("label", {
        className: cx('label')
      }, _react.default.createElement("input", {
        className: cx('checkbox'),
        type: "checkbox",
        checked: item.isRefined,
        onChange: function onChange() {
          return _this.selectItem(item, resetQuery);
        }
      }), _react.default.createElement("span", {
        className: cx('labelText')
      }, label), ' ', _react.default.createElement("span", {
        className: cx('count')
      }, item.count.toLocaleString()));
    });
    return _this;
  }

  (0, _createClass2.default)(RefinementList, [{
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
      return _react.default.createElement(_List.default, {
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
}(_react.Component);

(0, _defineProperty2.default)(RefinementList, "propTypes", {
  translate: _propTypes.default.func.isRequired,
  refine: _propTypes.default.func.isRequired,
  searchForItems: _propTypes.default.func.isRequired,
  searchable: _propTypes.default.bool,
  createURL: _propTypes.default.func.isRequired,
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string.isRequired,
    value: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
    count: _propTypes.default.number.isRequired,
    isRefined: _propTypes.default.bool.isRequired
  })),
  isFromSearch: _propTypes.default.bool.isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  showMore: _propTypes.default.bool,
  limit: _propTypes.default.number,
  showMoreLimit: _propTypes.default.number,
  transformItems: _propTypes.default.func,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(RefinementList, "defaultProps", {
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
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

exports.default = _default;