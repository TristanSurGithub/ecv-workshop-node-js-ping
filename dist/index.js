"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var process_1 = __importDefault(require("process"));
var ArgsParser_1 = require("./ArgsParser");
var Server_js_1 = require("./Server.js");
var argsParser = new ArgsParser_1.ArgsParser(process_1.default.argv);
if (argsParser.isServer()) {
    var listeningPort = argsParser.getListeningPort();
    console.log("Try listening on 127.0.0.1:" + listeningPort);
    var server = new Server_js_1.Server({
        listeningPort: listeningPort,
        onData: function (socket, data) {
            console.log("Data: " + data);
        }
    });
    server.listen();
    console.log("Server listening on port: " + listeningPort);
}
else {
    var address = argsParser.getAddress();
    if (address) {
        console.log("Vous voulez pinguer l'addresse " + address);
    }
    else {
        console.log("Merci de fournir une adresse IPv4 correcte à pinguer");
    }
}
