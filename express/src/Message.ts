export interface IMsg {
    /**
    * Horodatage du moment ou le serveur reçoit le message
    */
    readonly timestamp?: number
    /**
    * Identifiant de l'utilisateur envoyant le message
    */
    readonly userId?: string
    /**
    * Identifiant du salon dans lequel le message est envoyé
    */
    readonly roomId?: string
    /**
    * Contenu du message
    */
    readonly msg: string
}

