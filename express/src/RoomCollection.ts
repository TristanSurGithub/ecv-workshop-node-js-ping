import { IRoom } from "./Room";

export interface IRoomCollection extends Iterator<IRoom> {
    /**
     * Liste des identifiants des salons
     *
     * @type {Array<string>}
     * @memberof IRoomCollection
     */
    readonly all: Array<string>
    /**
     * Récupération des données d'un salon dont l'identifiant est `id`
     *
     * @param {string} id
     * @returns {(IRoom | false)}
     * @memberof IRoomCollection
     */
    get (id: string): IRoom | false
    /**
     * Ajoute un salon aux salons connus de cette collection
     *
     * @param {IRoom} room
     * @memberof IRoomCollection
     */
    add (room: IRoom): void
    /**
     * Supprime de cette collection un salon avec l'identifiant `id` donné
     *
     * @param {string} id
     * @memberof IRoomCollection
     */
    del (id: string): void
}

export class Rooms implements IRoomCollection{


    private rooms:{[k:string] :IRoom}
    private _ids: Array<string>
    private nextIdx: number

    constructor() {
        this.rooms = {};
        this._ids = [];
        this.nextIdx = 0;
    }

    get all(): Array<string> {
        return this._ids
    }

    set all(v: Array<string>) {
    }


    add(room:IRoom): void {
        if(this._ids.indexOf(room.id)==-1){
            this._ids.push(room.id)
        }
    }

    del(id: string): void {
        if (this._ids.indexOf(id) !== -1) {
            this._ids = this._ids.filter((ids) => ids !== id)
        }
    }

    get(id: string):IRoom | false {
        if (id in this.rooms) {
            return this.rooms[id]
        }
        return false;
    }

    // @ts-ignore
    next(...args: Array<string>): { value: IRoom, done?: false } | { value: undefined, done: true } {
        if (this.nextIdx < this._ids.length) {
            // @ts-ignore
            const ret = {value: IRoom, done: false} = {value: this.rooms[this._ids[this.nextIdx]], done: false}
            this.nextIdx++
            return ret
        }
        this.nextIdx = 0
        return {value: undefined, done: true}
    }
}