import { IUserCollection } from "./UserCollection";

export interface IRoomConfig {
    /**
    * Identifiant du salon
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly id: string
    /**
    * Intitulé du salon
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly title: string
    /**
    * Identifiant de l'éventuel administrateur du salon.
    * (S'il n'y a pas d'administrateur sur ce salon, on est sur un salon public)
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly adminId?: string
    /**
    * URL éventuelle de l'image représentant le salon
    *
    * @type {string}
    * @memberof IRoomConfig
    */
    readonly urlImage?: string
    /**
    * Collection des utilisateurs utilisée par le Web Socket Server
    *
    * @type {IUserCollection}
    * @memberof IRoomConfig
    */
    readonly usersCollection: IUserCollection
    /**
    * Liste des identifiants des utilisateurs qui sont initialement joint au salon courant
    *
    * @type {Array<string>}
    * @memberof IRoomConfig
    */
    readonly prejoinedUsers?: Array<string>
}

export interface IRoom {
    /**
    * Identifiant du salon
    *
    * @type {string}
    * @memberof IRoom
    */
    readonly id: string
    /**
    * Intitulé du salon
    *
    * @type {string}
    * @memberof IRoom
    */
    title: string
    /**
    * Liste des identifiants des users qui ont joint ce salon
    *
    * @type {Array<string>}
    * @memberof IRoom
    */
    readonly joinedUsers: Array<string>
    /**
    * Le salon est-il public?
    *
    * @type {boolean}
    * @memberof IRoom
    */
    readonly public: boolean
    /**
    * Si le salon est privé, identifiant de l'administrateur du salon.
    * Si le salon est public -> FALSE
    *
    * @type {(string | false)}
    * @memberof IRoom
    */
    readonly adminId: string | false
    /**
    * URL éventuelle de l'image représentant le salon
    *
    * @type {string}
    * @memberof IRoom
    */
    readonly urlImage: string | false
    /**
    * Joindre l'utilisateur d'identifiant `userId` à ce salon
    *
    * @param {string} userId
    * @returns {boolean}
    * @memberof IRoom
    */
    joinUser(userId: string): boolean
    /**
    * Retirer l'utilisateur d'identifiant `userId` de ce salon
    *
    * @param {string} userId
    * @memberof IRoom
    */
    leaveUser(userId: string): void
}

export class Room implements IRoom {
    id: string;
    title: string;
    joinedUsers: string[];
    public: boolean;
    adminId: string | false;
    urlImage: string | false;

    constructor(config: IRoomConfig) {
        this.id = config.id
        this.title = config.title
        this.joinedUsers = []
        this.public = true

        if (typeof config.adminId == "string") {
            this.adminId = config.adminId
        } else {
            this.adminId = false
        }

        if (typeof config.urlImage == "string") {
            this.urlImage = config.urlImage
        } else {
            this.urlImage = false
        }
    }

    joinUser(userId: string): boolean {
        if (this.joinedUsers?.indexOf(userId) === -1) {
            this.joinedUsers.push(userId);
            return true
        }
        return false
    }
    leaveUser(userId: string): void {
        if (userId in this.joinedUsers) {
            this.joinedUsers.splice(this.joinedUsers.indexOf(userId));
        }
    }
}