import http from "http"
import {
    Server as SocketIOServer,
    Socket
} from "socket.io"
import { IRoomCollection, RoomCollection } from "./RoomCollection"
import { User } from "./User"
import { IUserCollection, UserCollection } from "./UserCollection"

export interface IWSServerConfig {
    /**
    * Instance du Serveur HTTP renvoyé par http.createServer()
    *
    * @type {http.Server}
    * @memberof IWSServerConfig
    */
    httpSrv: http.Server
    /**
    * Eventuelle fonction de log customisée.
    * Si aucune fonction n'est fournie, utiliser console.log
    *
    * @memberof IWSServerConfig
    */
    log?: (...args: Array<any>) => void
}

export interface IWSServer {
    /**
    * Instance du serveur renvoyé par Socket.IO
    *
    * @type {SocketIOServer}
    * @memberof IWSServer
    */
    readonly server: SocketIOServer
    /**
    * Liste des utilisateurs en ligne
    *
    * @type {IUserCollection}
    * @memberof IWSServer
    */
    readonly onlineUsers: IUserCollection
    /**
    * Liste des salons connus du serveur
    *
    * @type {IRoomCollection}
    * @memberof IWSServer
    */
    readonly rooms: IRoomCollection
}

export class WServer implements IWSServer {
    server: SocketIOServer
    onlineUsers: IUserCollection
    rooms: IRoomCollection;

    constructor(config: IWSServerConfig) {
        this.server = new SocketIOServer(config.httpSrv)
        this.onlineUsers = new UserCollection()
        this.rooms = new RoomCollection();

        this.server.on("connection", (socket: Socket) => {
            let users = new UserCollection();
            let user = new User({
                id: socket.id,
                pseudo: 'Jean Tanrien',
                imgUrl: "",
                collection: users,
            })
            socket.on("disconnect", (reason: string) => {
                if (reason) {
                    console.log(`pour la raison suivante "${reason}"`);
                }
            })
            console.log(user);
            
            socket.on("chat", (msg: string) => {
                console.log(`Message du canal chat: "${msg}"`)
                socket.emit("chat", `${user.pseudo} : ${msg}`)
            })
        })

        const port: number = 8000
        config.httpSrv.listen(port, () => {
            console.log(`Serveur en écoute sur ${port} ...`);
        })
    }
}