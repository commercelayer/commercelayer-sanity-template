"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var _LinkList = _interopRequireDefault(require("./LinkList"));

var cx = (0, _utils.createClassNames)('Pagination'); // Determines the size of the widget (the number of pages displayed - that the user can directly click on)

function calculateSize(padding, maxPages) {
  return Math.min(2 * padding + 1, maxPages);
}

function calculatePaddingLeft(currentPage, padding, maxPages, size) {
  if (currentPage <= padding) {
    return currentPage;
  }

  if (currentPage >= maxPages - padding) {
    return size - (maxPages - currentPage);
  }

  return padding + 1;
} // Retrieve the correct page range to populate the widget


function getPages(currentPage, maxPages, padding) {
  var size = calculateSize(padding, maxPages); // If the widget size is equal to the max number of pages, return the entire page range

  if (size === maxPages) return (0, _utils.range)({
    start: 1,
    end: maxPages + 1
  });
  var paddingLeft = calculatePaddingLeft(currentPage, padding, maxPages, size);
  var paddingRight = size - paddingLeft;
  var first = currentPage - paddingLeft;
  var last = currentPage + paddingRight;
  return (0, _utils.range)({
    start: first + 1,
    end: last + 1
  });
}

var Pagination =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Pagination, _Component);

  function Pagination() {
    (0, _classCallCheck2.default)(this, Pagination);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Pagination).apply(this, arguments));
  }

  (0, _createClass2.default)(Pagination, [{
    key: "getItem",
    value: function getItem(modifier, translationKey, value) {
      var _this$props = this.props,
          nbPages = _this$props.nbPages,
          totalPages = _this$props.totalPages,
          translate = _this$props.translate;
      return {
        key: "".concat(modifier, ".").concat(value),
        modifier: modifier,
        disabled: value < 1 || value >= Math.min(totalPages, nbPages),
        label: translate(translationKey, value),
        value: value,
        ariaLabel: translate("aria".concat((0, _utils.capitalize)(translationKey)), value)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          ListComponent = _this$props2.listComponent,
          nbPages = _this$props2.nbPages,
          totalPages = _this$props2.totalPages,
          currentRefinement = _this$props2.currentRefinement,
          padding = _this$props2.padding,
          showFirst = _this$props2.showFirst,
          showPrevious = _this$props2.showPrevious,
          showNext = _this$props2.showNext,
          showLast = _this$props2.showLast,
          refine = _this$props2.refine,
          createURL = _this$props2.createURL,
          canRefine = _this$props2.canRefine,
          translate = _this$props2.translate,
          className = _this$props2.className,
          otherProps = (0, _objectWithoutProperties2.default)(_this$props2, ["listComponent", "nbPages", "totalPages", "currentRefinement", "padding", "showFirst", "showPrevious", "showNext", "showLast", "refine", "createURL", "canRefine", "translate", "className"]);
      var maxPages = Math.min(nbPages, totalPages);
      var lastPage = maxPages;
      var items = [];

      if (showFirst) {
        items.push({
          key: 'first',
          modifier: 'item--firstPage',
          disabled: currentRefinement === 1,
          label: translate('first'),
          value: 1,
          ariaLabel: translate('ariaFirst')
        });
      }

      if (showPrevious) {
        items.push({
          key: 'previous',
          modifier: 'item--previousPage',
          disabled: currentRefinement === 1,
          label: translate('previous'),
          value: currentRefinement - 1,
          ariaLabel: translate('ariaPrevious')
        });
      }

      items = items.concat(getPages(currentRefinement, maxPages, padding).map(function (value) {
        return {
          key: value,
          modifier: 'item--page',
          label: translate('page', value),
          value: value,
          selected: value === currentRefinement,
          ariaLabel: translate('ariaPage', value)
        };
      }));

      if (showNext) {
        items.push({
          key: 'next',
          modifier: 'item--nextPage',
          disabled: currentRefinement === lastPage || lastPage <= 1,
          label: translate('next'),
          value: currentRefinement + 1,
          ariaLabel: translate('ariaNext')
        });
      }

      if (showLast) {
        items.push({
          key: 'last',
          modifier: 'item--lastPage',
          disabled: currentRefinement === lastPage || lastPage <= 1,
          label: translate('last'),
          value: lastPage,
          ariaLabel: translate('ariaLast')
        });
      }

      return _react.default.createElement("div", {
        className: (0, _classnames.default)(cx('', !canRefine && '-noRefinement'), className)
      }, _react.default.createElement(ListComponent, (0, _extends2.default)({}, otherProps, {
        cx: cx,
        items: items,
        onSelect: refine,
        createURL: createURL,
        canRefine: canRefine
      })));
    }
  }]);
  return Pagination;
}(_react.Component);

(0, _defineProperty2.default)(Pagination, "propTypes", {
  nbPages: _propTypes.default.number.isRequired,
  currentRefinement: _propTypes.default.number.isRequired,
  refine: _propTypes.default.func.isRequired,
  createURL: _propTypes.default.func.isRequired,
  canRefine: _propTypes.default.bool.isRequired,
  translate: _propTypes.default.func.isRequired,
  listComponent: _propTypes.default.func,
  showFirst: _propTypes.default.bool,
  showPrevious: _propTypes.default.bool,
  showNext: _propTypes.default.bool,
  showLast: _propTypes.default.bool,
  padding: _propTypes.default.number,
  totalPages: _propTypes.default.number,
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(Pagination, "defaultProps", {
  listComponent: _LinkList.default,
  showFirst: true,
  showPrevious: true,
  showNext: true,
  showLast: false,
  padding: 3,
  totalPages: Infinity,
  className: ''
});

var _default = (0, _reactInstantsearchCore.translatable)({
  previous: '‹',
  next: '›',
  first: '«',
  last: '»',
  page: function page(currentRefinement) {
    return currentRefinement.toString();
  },
  ariaPrevious: 'Previous page',
  ariaNext: 'Next page',
  ariaFirst: 'First page',
  ariaLast: 'Last page',
  ariaPage: function ariaPage(currentRefinement) {
    return "Page ".concat(currentRefinement.toString());
  }
})(Pagination);

exports.default = _default;