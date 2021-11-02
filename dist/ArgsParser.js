"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgsParser = void 0;
var ArgsParser = /** @class */ (function () {
    function ArgsParser(args) {
        this.args = args;
    }
    ArgsParser.prototype.isServer = function () {
        return this.args.indexOf('server') !== -1;
    };
    ArgsParser.prototype.getListeningPort = function () {
        throw new Error("Method not implemented.");
    };
    ArgsParser.prototype.getAddress = function () {
        throw new Error("Method not implemented.");
    };
    return ArgsParser;
}());
exports.ArgsParser = ArgsParser;
