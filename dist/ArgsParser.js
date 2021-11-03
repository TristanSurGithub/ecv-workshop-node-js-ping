"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsParser = void 0;
var net_1 = require("net");
var ArgsParser = /** @class */ (function () {
    function ArgsParser(args) {
        this.args = args;
    }
    ArgsParser.prototype.isServer = function () {
        return this.args.indexOf('server') !== -1;
    };
    ArgsParser.prototype.getListeningPort = function () {
        var port = this.args.find(function (args) {
            return Number.isInteger(Number(args)) && (parseInt(args) >= 10000 && parseInt(args) <= 65535);
        });
        if (port) {
            return parseInt(port);
        }
        return 23456;
    };
    ArgsParser.prototype.getAddress = function () {
        var ipv4 = this.args.find(function (args) {
            return (0, net_1.isIPv4)(args);
        });
        if (ipv4) {
            return ipv4;
        }
        return false;
    };
    return ArgsParser;
}());
exports.ArgsParser = ArgsParser;
