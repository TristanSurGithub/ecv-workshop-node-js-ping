import process from "process";
import {
    IArgsParser,
    ArgsParser
} from "./ArgsParser"
const isServer : boolean =  process.argv.indexOf('server') !== -1

//const argsParser: IArgsParser = new Argspirser(process.argu)

if(isServer) {
    const port: number = argsParser.getListeningPort()
    console.log('t Try Listening on 127.0.0.1: S port')
} else if (process.argv.length >= 2) {
    const address : string = process.argv[2]
    console.log(address, process.argv);
} else {
    console.error("merci de préciser une adresse")
}

