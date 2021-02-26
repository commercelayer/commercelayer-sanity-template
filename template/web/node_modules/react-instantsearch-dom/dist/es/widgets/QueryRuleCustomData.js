import React from 'react';
import { connectQueryRules } from 'react-instantsearch-core';
import PanelCallbackHandler from '../components/PanelCallbackHandler';
import QueryRuleCustomData from '../components/QueryRuleCustomData';

var QueryRuleCustomDataWidget = function QueryRuleCustomDataWidget(props) {
  return React.createElement(PanelCallbackHandler, props, React.createElement(QueryRuleCustomData, props));
};

export default connectQueryRules(QueryRuleCustomDataWidget);