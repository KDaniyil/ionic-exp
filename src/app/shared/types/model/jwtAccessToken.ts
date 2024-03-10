/**
 * Token per la login
 */
 export interface JwtAccessToken {

    /**
     * Token di autenticazione
     * 
     * @example "eyJhbGciOiJIUzI1NiIsInR5cCI..."
     */
    jwtToken: string;

    /**
     * Token di refresh
     * 
     * @example "eyJhbGciOiJIUzI1NiIsInR5cCI..."
     */
    refreshToken: string
 }