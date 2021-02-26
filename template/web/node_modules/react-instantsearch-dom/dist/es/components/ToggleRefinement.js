import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createClassNames } from '../core/utils';
var cx = createClassNames('ToggleRefinement');

var ToggleRefinement = function ToggleRefinement(_ref) {
  var currentRefinement = _ref.currentRefinement,
      label = _ref.label,
      canRefine = _ref.canRefine,
      refine = _ref.refine,
      className = _ref.className;
  return React.createElement("div", {
    className: classNames(cx('', !canRefine && '-noRefinement'), className)
  }, React.createElement("label", {
    className: cx('label')
  }, React.createElement("input", {
    className: cx('checkbox'),
    type: "checkbox",
    checked: currentRefinement,
    onChange: function onChange(event) {
      return refine(event.target.checked);
    }
  }), React.createElement("span", {
    className: cx('labelText')
  }, label)));
};

ToggleRefinement.propTypes = {
  currentRefinement: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  canRefine: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
  className: PropTypes.string
};
ToggleRefinement.defaultProps = {
  className: ''
};
export default ToggleRefinement;