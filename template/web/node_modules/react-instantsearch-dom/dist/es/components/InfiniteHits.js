import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translatable } from 'react-instantsearch-core';
import { createClassNames } from '../core/utils';
var cx = createClassNames('InfiniteHits');

var InfiniteHits =
/*#__PURE__*/
function (_Component) {
  _inherits(InfiniteHits, _Component);

  function InfiniteHits() {
    _classCallCheck(this, InfiniteHits);

    return _possibleConstructorReturn(this, _getPrototypeOf(InfiniteHits).apply(this, arguments));
  }

  _createClass(InfiniteHits, [{
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
      return React.createElement("div", {
        className: classNames(cx(''), className)
      }, showPrevious && React.createElement("button", {
        className: cx('loadPrevious', !hasPrevious && 'loadPrevious--disabled'),
        onClick: function onClick() {
          return refinePrevious();
        },
        disabled: !hasPrevious
      }, translate('loadPrevious')), React.createElement("ul", {
        className: cx('list')
      }, hits.map(function (hit) {
        return React.createElement("li", {
          key: hit.objectID,
          className: cx('item')
        }, React.createElement(HitComponent, {
          hit: hit
        }));
      })), React.createElement("button", {
        className: cx('loadMore', !hasMore && 'loadMore--disabled'),
        onClick: function onClick() {
          return refineNext();
        },
        disabled: !hasMore
      }, translate('loadMore')));
    }
  }]);

  return InfiniteHits;
}(Component);

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  showPrevious: PropTypes.bool.isRequired,
  hasPrevious: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  refinePrevious: PropTypes.func.isRequired,
  refineNext: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  className: PropTypes.string,
  hitComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
InfiniteHits.defaultProps = {
  className: '',
  showPrevious: false,
  hitComponent: function hitComponent(hit) {
    return React.createElement("div", {
      style: {
        borderBottom: '1px solid #bbb',
        paddingBottom: '5px',
        marginBottom: '5px',
        wordBreak: 'break-all'
      }
    }, JSON.stringify(hit).slice(0, 100), "...");
  }
};
export default translatable({
  loadPrevious: 'Load previous',
  loadMore: 'Load more'
})(InfiniteHits);