"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var srv = (0, express_1.default)();
srv.get('/bonjour/:prenom', function (req, res) {
    var txt = "Bonjour " + req.params["prenom"];
    res.send(txt);
});
srv.listen(8000);
