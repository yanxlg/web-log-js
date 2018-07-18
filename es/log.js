/**
 * @disc:前端日志
 * 重定义console对象
 * @author:yanxinaliang
 * @time：2018/6/29 11:23
 */
import { Crypto } from "./crypto";
var logger = window["console"];
var Log = /** @class */function () {
    function Log() {}
    /**
     * @param host 服务地址
     * @param {string} appId 应用Id
     * @param {string} key 加解密秘钥
     */
    Log.init = function (host, appId, key) {
        this.host = host;
        this.appId = appId;
        this.key = key;
    };
    Log.sendToServer = function (level, content) {
        if (!this.appId || !this.key) {
            alert("请配置appId及appKey");
            return;
        }
        var image = new Image();
        image.src = this.host + "/favicon.png?k=" + this.appId + "&d=" + Crypto.encrypt(JSON.stringify({
            level: level,
            content: content
        }), this.key);
    };
    Log.toString = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        var _content = content.map(function (con) {
            return typeof con == 'string' ? con : JSON.stringify(con);
        });
        return _content.join(" ");
    };
    ;
    Log.trace = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (this.production) {
            this.sendToServer("trace", this.toString(content));
        } else {
            logger.log("%c" + content.join(" "), 'color:blue');
        }
    };
    Log.debug = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (this.production) {
            this.sendToServer("debug", this.toString(content));
        } else {
            logger.log("%c" + content.join(" "), 'color:cyan');
        }
    };
    Log.info = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (this.production) {
            this.sendToServer("info", this.toString(content));
        } else {
            logger.log("%c" + content.join(" "), 'color:green');
        }
    };
    Log.warn = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (this.production) {
            this.sendToServer("warn", this.toString(content));
        } else {
            logger.log("%c" + content.join(" "), 'color:yellow');
        }
    };
    Log.error = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (this.production) {
            this.sendToServer("error", this.toString(content));
        } else {
            logger.log("%c" + content.join(" "), 'color:red');
        }
    };
    Log.fatal = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        if (this.production) {
            this.sendToServer("fatal", this.toString(content));
        } else {
            logger.log("%c" + content.join(" "), 'color:magenta');
        }
    };
    Log.production = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'; //生产环境
    return Log;
}();
window.onerror = function () {
    var _a = arguments[4] || {},
        _b = _a.message,
        message = _b === void 0 ? "" : _b,
        _c = _a.name,
        name = _c === void 0 ? "" : _c,
        _d = _a.stack,
        stack = _d === void 0 ? "" : _d;
    Log.error(message, name, stack);
};
window.addEventListener("unhandledrejection", function (event) {
    Log.error(event.reason);
});
// window.console=Log;
export { Log };