import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { createClassNames } from '../core/utils';
import Highlighter from './Highlighter';
var cx = createClassNames('Highlight');

var Highlight = function Highlight(props) {
  return React.createElement(Highlighter, _extends({}, props, {
    highlightProperty: "_highlightResult",
    cx: cx
  }));
};

export default Highlight;