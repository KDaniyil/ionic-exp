import { JwtAccessToken } from './jwtAccessToken';
import { User } from './user';

/**
 * Risultato della login
 */
export interface ResultLogin {
  /**
   * Lista delle Countries
   */
  jwtAccessToken: JwtAccessToken;
  /**
   * Utente
   */

  user: User;
}
