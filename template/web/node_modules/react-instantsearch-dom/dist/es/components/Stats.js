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
import { createClassNames } from '../core/utils';
var cx = createClassNames('Stats');

var Stats =
/*#__PURE__*/
function (_Component) {
  _inherits(Stats, _Component);

  function Stats() {
    _classCallCheck(this, Stats);

    return _possibleConstructorReturn(this, _getPrototypeOf(Stats).apply(this, arguments));
  }

  _createClass(Stats, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          translate = _this$props.translate,
          nbHits = _this$props.nbHits,
          processingTimeMS = _this$props.processingTimeMS,
          className = _this$props.className;
      return React.createElement("div", {
        className: classNames(cx(''), className)
      }, React.createElement("span", {
        className: cx('text')
      }, translate('stats', nbHits, processingTimeMS)));
    }
  }]);

  return Stats;
}(Component);

_defineProperty(Stats, "propTypes", {
  translate: PropTypes.func.isRequired,
  nbHits: PropTypes.number.isRequired,
  processingTimeMS: PropTypes.number.isRequired,
  className: PropTypes.string
});

_defineProperty(Stats, "defaultProps", {
  className: ''
});

export default translatable({
  stats: function stats(n, ms) {
    return "".concat(n.toLocaleString(), " results found in ").concat(ms.toLocaleString(), "ms");
  }
})(Stats);