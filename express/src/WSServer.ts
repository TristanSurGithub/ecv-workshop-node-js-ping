import http from "http"
import {
    Server as SocketIOServer,
    Socket
} from "socket.io"
import { IRoomCollection, RoomCollection } from "./RoomCollection"
import { User } from "./User"
import { IUserCollection, UserCollection } from "./UserCollection"
import { IRoom, Room } from "./Room";

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
    room: IRoom 

    constructor(config: IWSServerConfig) {
        this.server = new SocketIOServer(config.httpSrv)
        this.onlineUsers = new UserCollection()
        this.room = new Room({ 
            id: '1', 
            title: 'Default', 
            usersCollection: this.onlineUsers
         });
        this.rooms = new RoomCollection();
        this.rooms.add(this.room);

        this.server.on("connection", (socket: Socket) => {
            socket.join(this.room.id);
           
            let users = new UserCollection();
            let user = new User({
                id: socket.id,
                pseudo: 'Jean Tanrien',
                imgUrl: 'avatar_default.png',
                collection: users,
            })

            this.room.joinUser(user.id)

            socket.on("disconnect", (reason: string) => {
                if (reason) {
                    console.log(`pour la raison suivante "${reason}"`);
                }
            })

            socket.on("chat", (msg: string) => {
                console.log(`Message du canal chat: "${msg}"`)
                this.server.emit("chat", { avatar: user.imgUrl, pseudo: user.pseudo, message: msg })
            })
        })

        const port: number = 8000
        config.httpSrv.listen(port, () => {
            console.log(`Serveur en écoute sur ${port} ...`);
        })
    }
}