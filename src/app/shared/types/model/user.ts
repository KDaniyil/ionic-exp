/**
 * Status dell'utente
 * 
 */
 export const enum StatusUser {
    PENDING = 'pending',
    ACTIVE = 'active',
    DELETED = 'deleted',
    BLOCKED = 'blocked'
 }
 
 
 /**
  * Tipologia dell'utente
  * 
  */
 export const enum TypeUser {
    User = "user",
    Author = "author",
    Editor = "editor",
    Mananger = "manager",
    Admin = "admin",
    Superadmin = "superadmin"
 }
 
 
 /**
  * Utente del sistema
  * 
  */
 export interface User {
 
    /**
     * Identificativo dell'utente
     * 
     * @example 1
     */
    id: number;
 
    /**
      * Status dell'utente
      * 
      * @example Pending
      */
    status: StatusUser;
 
    /**
     * Tipologia utente
     * 
     * @example User
     */
    type: TypeUser;
 
    /**
     * Email dell'utente
     * 
     * @example "user@email.com"
     */
    email: string;
 
    /**
     * Nome dell'utente
     * 
     * @example "Mario"
     */
    name?: string;
 
    /**
     * Cognome dell'utente
     * 
     * @example "Rossi"
     */
    surname?: string;
 
    /**
     * Telefono dell'utente
     * 
     * @example 3291100000
     */
    phone?: string;
 
    /**
     * Data creazione
     * 
     * @format date-time
     * @example 2017-07-21T17:32:28Z
     */
    createdAt?: string;
 
    /**
     * Data ultima modifica
     * 
     * @format date-time
     * @example 2017-07-21T17:32:28Z
     */
     updatedAt?: string;
 }