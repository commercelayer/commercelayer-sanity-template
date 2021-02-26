import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import { createClassNames } from '../core/utils';
import Highlighter from './Highlighter';
var cx = createClassNames('Snippet');

var Snippet = function Snippet(props) {
  return React.createElement(Highlighter, _extends({}, props, {
    highlightProperty: "_snippetResult",
    cx: cx
  }));
};

export default Snippet;