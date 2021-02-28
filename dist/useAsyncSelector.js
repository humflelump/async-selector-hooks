"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var async_selector_1 = require("async-selector");
function useAsyncSelector(params, deps) {
    var _a = react_1.default.useState({}), x = _a[0], rerender = _a[1];
    var ref = react_1.default.useState({
        activePromise: null,
        activeSelectorState: null,
    })[0];
    var asyncSelector = react_1.default.useMemo(function () { return async_selector_1.createAsyncSelector(__assign(__assign({}, params), { onResolve: function (result) {
            params.onResolve && params.onResolve(result);
            rerender({});
        }, onReject: function (error) {
            params.onReject && params.onReject(error);
            rerender({});
        }, onCancel: function (cancelledPromise) {
            if (cancelledPromise === ref.activePromise && ref.activeSelectorState) {
                ref.activeSelectorState.cancelled = true;
                ref.activeSelectorState.onCancel();
            }
            params.onCancel && params.onCancel(cancelledPromise);
        }, async: function () {
            var vals = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                vals[_i] = arguments[_i];
            }
            var promise = new Promise(function (resolve, reject) {
                var selectorState = {
                    onCancel: function () { return null; },
                    cancelled: false,
                };
                ref.activeSelectorState = selectorState;
                params.async.apply(params, __spreadArrays(vals, [selectorState])).then(resolve)
                    .catch(reject);
            });
            ref.activePromise = promise;
            return promise;
        } }), deps.map(function (d, index) { return function (deps) { return deps[index]; }; })); }, []);
    var result = asyncSelector(deps);
    var error = result.isRejected ? result.value : null;
    var isWaiting = result.isWaiting;
    var value = (function () {
        if (result.previous === undefined) {
            if (params.defaultValue === undefined) {
                return [];
            }
            else {
                return params.defaultValue;
            }
        }
        else {
            return result.previous;
        }
    })();
    var forceUpdate = function () {
        asyncSelector.forceUpdate(deps);
        return ref.activePromise;
    };
    return [value, isWaiting, error, forceUpdate];
}
exports.useAsyncSelector = useAsyncSelector;
