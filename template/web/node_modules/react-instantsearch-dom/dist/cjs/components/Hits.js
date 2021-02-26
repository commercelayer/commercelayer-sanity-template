"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../core/utils");

var cx = (0, _utils.createClassNames)('Hits');

var DefaultHitComponent = function DefaultHitComponent(props) {
  return _react.default.createElement("div", {
    style: {
      borderBottom: '1px solid #bbb',
      paddingBottom: '5px',
      marginBottom: '5px',
      wordBreak: 'break-all'
    }
  }, JSON.stringify(props).slice(0, 100), "...");
};

var Hits = function Hits(_ref) {
  var hits = _ref.hits,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$hitComponent = _ref.hitComponent,
      HitComponent = _ref$hitComponent === void 0 ? DefaultHitComponent : _ref$hitComponent;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)(cx(''), className)
  }, _react.default.createElement("ul", {
    className: cx('list')
  }, hits.map(function (hit) {
    return _react.default.createElement("li", {
      className: cx('item'),
      key: hit.objectID
    }, _react.default.createElement(HitComponent, {
      hit: hit
    }));
  })));
};

var HitPropTypes = _propTypes.default.shape({
  objectID: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired
});

Hits.propTypes = {
  hits: _propTypes.default.arrayOf(HitPropTypes.isRequired).isRequired,
  className: _propTypes.default.string,
  hitComponent: _propTypes.default.func
};
var _default = Hits;
exports.default = _default;