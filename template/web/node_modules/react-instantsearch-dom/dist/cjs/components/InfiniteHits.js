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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('InfiniteHits');

var InfiniteHits =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InfiniteHits, _Component);

  function InfiniteHits() {
    (0, _classCallCheck2.default)(this, InfiniteHits);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InfiniteHits).apply(this, arguments));
  }

  (0, _createClass2.default)(InfiniteHits, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          HitComponent = _this$props.hitComponent,
          hits = _this$props.hits,
          showPrevious = _this$props.showPrevious,
          hasPrevious = _this$props.hasPrevious,
          hasMore = _this$props.hasMore,
          refinePrevious = _this$props.refinePrevious,
          refineNext = _this$props.refineNext,
          translate = _this$props.translate,
          className = _this$props.className;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx(''), className)
      }, showPrevious && _react.default.createElement("button", {
        className: cx('loadPrevious', !hasPrevious && 'loadPrevious--disabled'),
        onClick: function onClick() {
          return refinePrevious();
        },
        disabled: !hasPrevious
      }, translate('loadPrevious')), _react.default.createElement("ul", {
        className: cx('list')
      }, hits.map(function (hit) {
        return _react.default.createElement("li", {
          key: hit.objectID,
          className: cx('item')
        }, _react.default.createElement(HitComponent, {
          hit: hit
        }));
      })), _react.default.createElement("button", {
        className: cx('loadMore', !hasMore && 'loadMore--disabled'),
        onClick: function onClick() {
          return refineNext();
        },
        disabled: !hasMore
      }, translate('loadMore')));
    }
  }]);
  return InfiniteHits;
}(_react.Component);

InfiniteHits.propTypes = {
  hits: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  showPrevious: _propTypes.default.bool.isRequired,
  hasPrevious: _propTypes.default.bool.isRequired,
  hasMore: _propTypes.default.bool.isRequired,
  refinePrevious: _propTypes.default.func.isRequired,
  refineNext: _propTypes.default.func.isRequired,
  translate: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  hitComponent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
};
InfiniteHits.defaultProps = {
  className: '',
  showPrevious: false,
  hitComponent: function hitComponent(hit) {
    return _react.default.createElement("div", {
      style: {
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
        wordBreak: 'break-all'
      }
    }, JSON.stringify(hit).slice(0, 100), "...");
  }
};

var _default = (0, _reactInstantsearchCore.translatable)({
  loadPrevious: 'Load previous',
  loadMore: 'Load more'
})(InfiniteHits);

exports.default = _default;