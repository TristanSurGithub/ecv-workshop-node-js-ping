import { IUserCollection, Users } from "./UserCollection"

export interface IUserConfig {
    /**
    * Identifiant de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    readonly id: string
    /**
    * Pseudo éventuel de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    readonly pseudo?: string
    /**
    * Url de l'éventuelle image de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    readonly imgUrl?: string
    /**
    * Collection à l'intérieur de laquelle est enregistré l'utilisateur
    *
    * @type {IUserCollection}
    * @memberof IUserConfig
    */
    readonly collection: IUserCollection
}

export interface IUser {
    /**
    * Identifiant de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    readonly id: string
    /**
    * Pseudo éventuel de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    pseudo?: string
    /**
    * Url de l'éventuelle image de l'utilisateur
    *
    * @type {string}
    * @memberof IUserConfig
    */
    imgUrl?: string
    /**
    * Collection à l'intérieur de laquelle est enregistré l'utilisateur
    *
    * @type {IUserCollection}
    * @memberof IUserConfig
    */
    collection: IUserCollection
    /**
    * Liste des identifiants des salons que l'utilisateur à joint
    *
    * @type {Array<string>}
    * @memberof IUser
    */
    rooms?: Array<string>
    /**
    * Méthode permettant d'inclure l'utilisateur dans un salon
    *
    * @param {string} roomId
    * @memberof IUser
    */
    joinRoom(roomId: string): void
    /**
    * Méthode permettant à un utilisateur de quitter un salon
    *
    * @param {string} roomId
    * @memberof IUser
    */
    leaveRoom(roomId: string): void
}

export class User implements IUser {
    id: string
    pseudo: string | undefined
    imgUrl: string | undefined
    rooms: Array<string>
    collection: IUserCollection

    constructor(config:IUserConfig) {
        this.id = config.id
        this.pseudo = config.pseudo
        this.imgUrl = config.imgUrl
        this.collection = config.collection
        this.rooms = []
        this.collection.add(this)
    }

    joinRoom(roomId: string): void {
        if (this.rooms?.indexOf(roomId) === -1) {
            this.rooms.push(roomId);
        }
    }

    leaveRoom(roomId: string): void {
        if (roomId in this.rooms) {
            this.rooms.splice(this.rooms.indexOf(roomId));
        }
    }
}
