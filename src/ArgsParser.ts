import{
    isIPv4
} from "net"
import { argv } from "process";

export interface IArgsParser {
    /**
    * Le programme a-t-il été appelé en tant que Serveur ?
    * Le programme a été appelé en tant que serveur si l'argument "server" est présent au moins une fois sur la ligne de commande.
    *
    * @returns {boolean} True si oui, Faux sinon
    * @memberof IArgsParser
    */
    isServer (): boolean
    /**
    * Renvoie le numéro de port sur lequel écouter les connexions entrantes
    * La valeur est le premier nombre compris entre 10000 et 65535 qui aura été éventuellement transmis sur la ligne de commande.
    * Si aucune valeur transmise, la valeur par défaut est 23456
    *
    * @returns {number}
    * @memberof IArgsParser
    */
    getListeningPort (): number
    /**
    * Renvoie la première adresse IPv4 transmise sur la ligne de commande.
    * Si aucune adresse IPv4 n'a été transmise sur la ligne de commande, renvoyer FALSE
    * 
    * @returns { number | false }
    * @memberof IArgsParser
    */
    getAddress (): string | false
}

export class ArgsParser implements IArgsParser {
    
    args: string[];
    
    constructor(args: string[]) {
        this.args = args
    }

    isServer(): boolean {
        return this.args.indexOf('server') !== -1
    }

    getListeningPort(): number {
        let port = this.args.find(args =>{
            return Number.isInteger(Number(args)) && (parseInt(args) >= 10000 && parseInt(args) <= 65535)
        })

        if(port){
            return parseInt(port);
        }
        return 23456

    }

    getAddress(): string | false {
        let ipv4 = this.args.find(args => {
             return isIPv4(args);
        })

        if(ipv4) {
            return ipv4;
        }

        return false
    }
}