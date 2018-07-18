"use strict";

exports.__esModule = true;
/**
 * @disc:AES 加密
 * @author:yanxinaliang
 * @time：2018/6/29 13:47
 */
var AES = require("crypto-js/aes");
var Utf8 = require("crypto-js/enc-utf8");
var ModeECB = require("crypto-js/mode-ecb");
var ZeroPadding = require("crypto-js/pad-zeropadding");
var MD5 = require("crypto-js/md5");
var CryptoBase64 = require("crypto-js/enc-base64");
var Crypto = /** @class */function () {
    function Crypto() {}
    Crypto.encrypt = function (data, key) {
        var config = {
            mode: ModeECB,
            padding: ZeroPadding,
            iv: Utf8.parse(MD5(key).toString())
        };
        return AES.encrypt(data, key, config).toString();
    };
    Crypto.decrypt = function (cipherText, key) {
        var config = {
            mode: ModeECB,
            padding: ZeroPadding,
            iv: Utf8.parse(MD5(key).toString())
        };
        return AES.decrypt(cipherText, key, config).toString(Utf8);
    };
    return Crypto;
}();
var Base64Util = /** @class */function () {
    function Base64Util() {}
    Base64Util.stringify = function (word) {
        return encodeURIComponent(CryptoBase64.stringify(Utf8.parse(word)));
    };
    Base64Util.parse = function (base64) {
        return CryptoBase64.parse(decodeURIComponent(base64)).toString(Utf8);
    };
    return Base64Util;
}();
exports.Crypto = Crypto;
exports.Base64Util = Base64Util;