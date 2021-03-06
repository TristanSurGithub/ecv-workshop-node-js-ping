import path from "path"
import http from "http"
import express from "express"
import { WServer } from "./WSServer"

const webSrv = express()
const httpSrv = http.createServer(webSrv)
new WServer({ httpSrv })

webSrv.get('/bonjour/:prenom', (req, res) => {
    const txt = `Bonjour ${req.params["prenom"]}`
    res.send(txt)
})

webSrv.get('/chat/:file', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", req.params["file"]))
})