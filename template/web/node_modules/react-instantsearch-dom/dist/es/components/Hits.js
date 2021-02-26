import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
var cx = createClassNames('Hits');

var DefaultHitComponent = function DefaultHitComponent(props) {
  return React.createElement("div", {
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
  return React.createElement("div", {
    className: classNames(cx(''), className)
  }, React.createElement("ul", {
    className: cx('list')
  }, hits.map(function (hit) {
    return React.createElement("li", {
      className: cx('item'),
      key: hit.objectID
    }, React.createElement(HitComponent, {
      hit: hit
    }));
  })));
};

var HitPropTypes = PropTypes.shape({
  objectID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
});
Hits.propTypes = {
  hits: PropTypes.arrayOf(HitPropTypes.isRequired).isRequired,
  className: PropTypes.string,
  hitComponent: PropTypes.func
};
export default Hits;