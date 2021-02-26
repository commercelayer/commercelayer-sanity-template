import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import cx from 'classnames';
export var createClassNames = function createClassNames(block) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ais';
  return function () {
    for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    var suitElements = elements.filter(function (element) {
      return element || element === '';
    }).map(function (element) {
      var baseClassName = "".concat(prefix, "-").concat(block);
      return element ? "".concat(baseClassName, "-").concat(element) : baseClassName;
    });
    return cx(suitElements);
  };
};
export var isSpecialClick = function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
};
export var capitalize = function capitalize(key) {
  return key.length === 0 ? '' : "".concat(key[0].toUpperCase()).concat(key.slice(1));
};
// taken from InstantSearch.js/utils
export function range(_ref) {
  var _ref$start = _ref.start,
      start = _ref$start === void 0 ? 0 : _ref$start,
      end = _ref.end,
      _ref$step = _ref.step,
      step = _ref$step === void 0 ? 1 : _ref$step;
  // We can't divide by 0 so we re-assign the step to 1 if it happens.
  var limitStep = step === 0 ? 1 : step; // In some cases the array to create has a decimal length.
  // We therefore need to round the value.
  // Example:
  //   { start: 1, end: 5000, step: 500 }
  //   => Array length = (5000 - 1) / 500 = 9.998

  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray(Array(arrayLength)).map(function (_, current) {
    return (start + current) * limitStep;
  });
}
export function find(array, comparator) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }

  return undefined;
}