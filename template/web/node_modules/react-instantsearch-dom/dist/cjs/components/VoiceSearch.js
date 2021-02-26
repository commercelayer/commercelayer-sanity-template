"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactInstantsearchCore = require("react-instantsearch-core");

var _utils = require("../core/utils");

var _voiceSearchHelper = _interopRequireDefault(require("../lib/voiceSearchHelper"));

var cx = (0, _utils.createClassNames)('VoiceSearch');

var ButtonSvg = function ButtonSvg(_ref) {
  var children = _ref.children;
  return _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, children);
};

var DefaultButtonText = function DefaultButtonText(_ref2) {
  var status = _ref2.status,
      errorCode = _ref2.errorCode,
      isListening = _ref2.isListening;
  return status === 'error' && errorCode === 'not-allowed' ? _react.default.createElement(ButtonSvg, null, _react.default.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  }), _react.default.createElement("path", {
    d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"
  }), _react.default.createElement("path", {
    d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"
  }), _react.default.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "23"
  }), _react.default.createElement("line", {
    x1: "8",
    y1: "23",
    x2: "16",
    y2: "23"
  })) : _react.default.createElement(ButtonSvg, null, _react.default.createElement("path", {
    d: "M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z",
    fill: isListening ? 'currentColor' : ''
  }), _react.default.createElement("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  }), _react.default.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "23"
  }), _react.default.createElement("line", {
    x1: "8",
    y1: "23",
    x2: "16",
    y2: "23"
  }));
};

var DefaultStatus = function DefaultStatus(_ref3) {
  var transcript = _ref3.transcript;
  return _react.default.createElement("p", null, transcript);
};

var VoiceSearch =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(VoiceSearch, _Component);

  function VoiceSearch() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, VoiceSearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(VoiceSearch)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "voiceSearchHelper", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClick", function (event) {
      if (!_this.voiceSearchHelper) {
        return;
      }

      event.currentTarget.blur();
      var toggleListening = _this.voiceSearchHelper.toggleListening;
      toggleListening();
    });
    return _this;
  }

  (0, _createClass2.default)(VoiceSearch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          _this$props$searchAsY = _this$props.searchAsYouSpeak,
          searchAsYouSpeak = _this$props$searchAsY === void 0 ? false : _this$props$searchAsY,
          language = _this$props.language,
          refine = _this$props.refine;
      this.voiceSearchHelper = (0, _voiceSearchHelper.default)({
        searchAsYouSpeak: searchAsYouSpeak,
        language: language,
        onQueryChange: function onQueryChange(query) {
          return refine(query);
        },
        onStateChange: function onStateChange() {
          _this2.setState(_this2.voiceSearchHelper.getState());
        }
      });
      this.setState(this.voiceSearchHelper.getState());
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.voiceSearchHelper) {
        return null;
      }

      var _this$state = this.state,
          status = _this$state.status,
          transcript = _this$state.transcript,
          isSpeechFinal = _this$state.isSpeechFinal,
          errorCode = _this$state.errorCode;
      var _this$voiceSearchHelp = this.voiceSearchHelper,
          isListening = _this$voiceSearchHelp.isListening,
          isBrowserSupported = _this$voiceSearchHelp.isBrowserSupported;
      var _this$props2 = this.props,
          translate = _this$props2.translate,
          ButtonTextComponent = _this$props2.buttonTextComponent,
          StatusComponent = _this$props2.statusComponent;
      var innerProps = {
        status: status,
        errorCode: errorCode,
        isListening: isListening(),
        transcript: transcript,
        isSpeechFinal: isSpeechFinal,
        isBrowserSupported: isBrowserSupported()
      };
      return _react.default.createElement("div", {
        className: cx('')
      }, _react.default.createElement("button", {
        className: cx('button'),
        type: "button",
        title: isBrowserSupported() ? translate('buttonTitle') : translate('disabledButtonTitle'),
        onClick: this.onClick,
        disabled: !isBrowserSupported()
      }, _react.default.createElement(ButtonTextComponent, innerProps)), _react.default.createElement("div", {
        className: cx('status')
      }, _react.default.createElement(StatusComponent, innerProps)));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.voiceSearchHelper) {
        this.voiceSearchHelper.dispose();
      }
    }
  }]);
  return VoiceSearch;
}(_react.Component);

(0, _defineProperty2.default)(VoiceSearch, "defaultProps", {
  searchAsYouSpeak: false,
  buttonTextComponent: DefaultButtonText,
  statusComponent: DefaultStatus
});

var _default = (0, _reactInstantsearchCore.translatable)({
  buttonTitle: 'Search by voice',
  disabledButtonTitle: 'Search by voice (not supported on this browser)'
})(VoiceSearch);

exports.default = _default;