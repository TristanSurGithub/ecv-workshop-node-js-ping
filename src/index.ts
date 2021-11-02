import process from "process";
import {
    IArgsParser,
    ArgsParser
} from "./ArgsParser"
const isServer : boolean =  process.argv.indexOf('server') !== -1

const argsParser:IArgsParser = new ArgsParser(process.argv)

if(argsParser.isServer()) {
    const port:number = argsParser.getListeningPort();
    console.log(`Try listening on 127.0.0.1:${port}`)

} else if (process.argv.length >= 2) {
    const address : string = process.argv[2]
    console.log(address, process.argv);
} else {
    console.error("merci de préciser une adresse")
}

