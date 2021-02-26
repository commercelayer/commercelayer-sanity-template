import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames, capitalize, range } from '../core/utils';
import LinkList from './LinkList';
var cx = createClassNames('Pagination'); // Determines the size of the widget (the number of pages displayed - that the user can directly click on)

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

  if (size === maxPages) return range({
    start: 1,
    end: maxPages + 1
  });
  var paddingLeft = calculatePaddingLeft(currentPage, padding, maxPages, size);
  var paddingRight = size - paddingLeft;
  var first = currentPage - paddingLeft;
  var last = currentPage + paddingRight;
  return range({
    start: first + 1,
    end: last + 1
  });
}

var Pagination =
/*#__PURE__*/
function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    _classCallCheck(this, Pagination);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pagination).apply(this, arguments));
  }

  _createClass(Pagination, [{
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
        ariaLabel: translate("aria".concat(capitalize(translationKey)), value)
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
          otherProps = _objectWithoutProperties(_this$props2, ["listComponent", "nbPages", "totalPages", "currentRefinement", "padding", "showFirst", "showPrevious", "showNext", "showLast", "refine", "createURL", "canRefine", "translate", "className"]);

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

      return React.createElement("div", {
        className: classNames(cx('', !canRefine && '-noRefinement'), className)
      }, React.createElement(ListComponent, _extends({}, otherProps, {
        cx: cx,
        items: items,
        onSelect: refine,
        createURL: createURL,
        canRefine: canRefine
      })));
    }
  }]);

  return Pagination;
}(Component);

_defineProperty(Pagination, "propTypes", {
  nbPages: PropTypes.number.isRequired,
  currentRefinement: PropTypes.number.isRequired,
  refine: PropTypes.func.isRequired,
  createURL: PropTypes.func.isRequired,
  canRefine: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  listComponent: PropTypes.func,
  showFirst: PropTypes.bool,
  showPrevious: PropTypes.bool,
  showNext: PropTypes.bool,
  showLast: PropTypes.bool,
  padding: PropTypes.number,
  totalPages: PropTypes.number,
  className: PropTypes.string
});

_defineProperty(Pagination, "defaultProps", {
  listComponent: LinkList,
  showFirst: true,
  showPrevious: true,
  showNext: true,
  showLast: false,
  padding: 3,
  totalPages: Infinity,
  className: ''
});

export default translatable({
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