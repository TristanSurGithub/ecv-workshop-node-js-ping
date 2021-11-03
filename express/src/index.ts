import path from "path"
import http from "http"
import express from "express"
import {
    Server,
    Socket
} from "socket.io"
import { User } from "./User"
import { Users } from "./UserCollection"

const webSrv = express()
const httpSrv = http.createServer(webSrv)
const wsSrv = new Server(httpSrv)

webSrv.get('/bonjour/:prenom', (req, res) => {
    const txt = `Bonjour ${req.params["prenom"]}`
    res.send(txt)
})

webSrv.get('/sources/:file', (req, res) => {
    res. sendFile(path.join(__dirname, "..", "public", req.params["file"]))
})

wsSrv.on("connection", (socket: Socket) => {
    let users = new Users();

    let user = new User({
        id: "1",
        pseudo: "Jean Tanrien",
        imgUrl: "",
        collection: users,
    });    console.log(User);
    
    console.log("Un utilisateur s'est connecté");
    socket.on("disconnect", (reason: string) => {
        console.log("Utilisateur déconnecté");
        if (reason) {
            console.log(`pour la raison suivante "${reason}"`);
        }
    })
    socket.on("chat", (msg: string) => {
        console.log(`Message du canal chat: "${msg}"`)
        socket.emit("chat", `${user.pseudo} : ${msg}"`)
    })
})

const port: number = 8000
httpSrv.listen(port, () => {
    console.log(`Serveur en écoute sur ${port} ...`);
})

