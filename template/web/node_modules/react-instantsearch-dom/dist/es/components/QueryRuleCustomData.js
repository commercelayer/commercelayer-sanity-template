import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
var cx = createClassNames('QueryRuleCustomData');

var QueryRuleCustomData = function QueryRuleCustomData(_ref) {
  var items = _ref.items,
      className = _ref.className,
      children = _ref.children;
  return React.createElement("div", {
    className: classNames(cx(''), className)
  }, children({
    items: items
  }));
};

QueryRuleCustomData.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  children: PropTypes.func.isRequired
};
export default QueryRuleCustomData;