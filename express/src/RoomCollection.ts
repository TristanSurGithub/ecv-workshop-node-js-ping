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

export class RoomCollection implements IRoomCollection{


    private rooms:{[k:string] :IRoom}
    private ids: Array<string>
    private nextIdx: number

    constructor() {
        this.rooms = {};
        this.ids = [];
        this.nextIdx = 0;
    }

    get all(): Array<string> {
        return this.ids
    }

    set all(v: Array<string>) {
    }

    get(id: string):IRoom | false {
        if (id in this.rooms) {
            return this.rooms[id]
        }
        return false;
    }

    add(room:IRoom): void {
        if(this.ids.indexOf(room.id)==-1){
            this.ids.push(room.id)
        }
    }

    del(id: string): void {
        if (this.ids.indexOf(id) !== -1) {
            this.ids = this.ids.filter((ids) => ids !== id)
        }
    }

    next(...args: Array<any>):{value : IRoom, done?: false} | { value : undefined, done :true}{
        if (this.nextIdx >= this.ids.length) {
            const ret : { value : IRoom, done : false }
                = { value:this.rooms[this.ids[this.nextIdx]], done : false}
            this.nextIdx++
            return ret
        }
        this.nextIdx = 0
        return {value: undefined, done: true}
    }
}

