"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var isServer = process_1.default.argv.indexOf('server') !== -1;
//const argsParser: IArgsParser = new Argspirser(process.argu)
if (isServer) {
    //const port: number = argsParser.getListeningPort()
    //console.log('t Try Listening on 127.0.0.1: S port')
}
else if (process_1.default.argv.length >= 2) {
    var address = process_1.default.argv[2];
    console.log(address, process_1.default.argv);
}
else {
    console.error("merci de préciser une adresse");
}
