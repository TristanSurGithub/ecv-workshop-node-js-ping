import { IUser, IUserConfig, User } from "./User"

export interface IUserCollection extends Iterator<IUser> {
    /**
    * Liste des identifiants des utilisateurs
    *
    * @type {Array<string>}
    * @memberof IUsers
    */
    readonly all: Array<string>
    /**
    * Récupération des données d'un utilisateur dont l'identifiant est `id`
    *
    * @param {string} id
    * @returns {(IUser | false)}
    * @memberof IUsers
    */
    get(id: string): IUser | false
    /**
    * Ajoute un utilisateur aux utilisateurs connus de cette collection
    *
    * @param {IUser} user
    * @memberof IUsers
    */
    add(user: IUser): void
    /**
    * Supprime de cette collection un utilisateur avec l'identifiant `id` donné
    *
    * @param {string} id
    * @memberof IUserCollection
    */
    del(id: string): void
}

export class Users implements IUserCollection {
    users: { [k: string]: any }
    ids: Array<string>
    nextIdx: number

    constructor() {
        this.users = {}
        this.ids = []
        this.nextIdx = 0
    }

    get all(): Array<string> { return this.ids };
    set all(v: Array<string>) { };

    get(id: string): false | IUser {
        if (id in this.users) {
            return this.users[id]
        }
        return false
    }

    add(user: IUser): void {
        if (this.ids.indexOf(user.id) === -1) {
            this.ids.push(user.id)
            this.users[user.id] = user
        }
    }

    del(id: string): void {
        if (id in this.users) {
            this.ids = this.ids.filter((currentId: string) => currentId != id)
        }
    }

    next(...args: []): { value: IUser, done?: false } | { value: undefined, done: true } {
        if (this.nextIdx < this.ids.length) {
            const ret: { value: IUser, done: false }
                = { value: this.users[this.ids[this.nextIdx]], done: false }
            this.nextIdx++;
            return ret
        }
        this.nextIdx = 0
        return { value: undefined, done: true }
    }
}
