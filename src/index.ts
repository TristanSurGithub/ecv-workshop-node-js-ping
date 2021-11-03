import process from "process";
import {
    IArgsParser,
    ArgsParser
} from "./ArgsParser";

import {
    IServer,
    Server
} from "./Server.js";

import net from "net";

const argsParser: IArgsParser = new ArgsParser(process.argv)

if (argsParser.isServer()) {
    const listeningPort: number = argsParser.getListeningPort()
    console.log(`Try listening on 127.0.0.1:${listeningPort}`)
    const server: IServer = new Server({
        listeningPort,
        onData: (socket: net.Socket, data: string) => {
            console.log(`Data: ${data}`)
        }
    })
    server.listen()
    console.log(`Server listening on port: ${listeningPort}`)

} else {
    const address: string | false = argsParser.getAddress()
    if (address) {
        console.log(`Vous voulez pinguer l'addresse ${address}`)
    }
    else {
        console.log("Merci de fournir une adresse IPv4 correcte à pinguer")
    }
}