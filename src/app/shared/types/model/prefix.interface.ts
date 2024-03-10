export interface PrefixInterface {
  id: number;
  prefix: string;
  label_prefix: string;
  countryShortName: string; //Nome breve della nazione esempio ITA
  abstract: string; //Nome esteso della nazione
  extraInfo?: string;
  userId?: number; //UserId dell'utente che crea il record
  createdAt?: string; //Data creazione
  updatedAt?: string; //Data ultima modifica
}
