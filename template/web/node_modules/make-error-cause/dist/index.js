"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var makeError = require("make-error");
var util_1 = require("util");
/**
 * @internal
 */
exports.SEPARATOR_TEXT = "\n\nThe following exception was the direct cause of the above exception:\n\n";
/**
 * Create a new error instance of `cause` property support.
 */
var BaseError = /** @class */ (function (_super) {
    __extends(BaseError, _super);
    function BaseError(message, cause) {
        var _this = _super.call(this, message) || this;
        _this.cause = cause;
        Object.defineProperty(_this, "cause", {
            writable: false,
            enumerable: false,
            configurable: false
        });
        return _this;
    }
    BaseError.prototype[util_1.inspect.custom || /* istanbul ignore next */ "inspect"] = function () {
        return fullStack(this);
    };
    return BaseError;
}(makeError.BaseError));
exports.BaseError = BaseError;
/**
 * Capture the full stack trace of any error instance.
 */
function fullStack(error) {
    var chain = [];
    var cause = error;
    while (cause) {
        chain.push(cause);
        cause = cause.cause;
    }
    return chain
        .map(function (err) { return util_1.inspect(err, { customInspect: false }); })
        .join(exports.SEPARATOR_TEXT);
}
exports.fullStack = fullStack;
//# sourceMappingURL=index.js.map