"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var ServerNet = __importStar(require("net"));
var Server = /** @class */ (function () {
    function Server(serverConfig) {
        var _this = this;
        this.listeningPort = serverConfig.listeningPort;
        if (serverConfig.log) {
            this.log = serverConfig.log;
        }
        if (serverConfig.error) {
            this.error = serverConfig.error;
        }
        this.onData = serverConfig.onData;
        this.server = ServerNet.createServer();
        this.server.on('connection', function (socket) {
            _this.log("connection " + socket.remoteAddress);
            socket.on('data', function (data) {
                _this.onData(socket, 'data');
            });
            socket.on('end', function () {
                _this.log("D\u00E9connexion " + socket.remoteAddress);
            });
            socket.on('error', function (err) { return _this.error(err); });
        });
    }
    Server.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
    };
    ;
    Server.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.server.on('error', function (err) {
            console.error(err);
        });
    };
    ;
    Server.prototype.onData = function (socket, data) {
        console.log(data);
    };
    ;
    Server.prototype.listen = function () {
        this.server.listen(this.listeningPort);
    };
    Server.prototype.close = function () {
        this.server.close();
    };
    return Server;
}());
exports.Server = Server;
