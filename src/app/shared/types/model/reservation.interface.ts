import { Product } from './product';
import { Slot } from './slot';

export interface ReservationAddInterface {
  productId: number; //Product ID - id del prodotto
  slotId: number; //Slot ID - id dello slot
  userName: string; //User name - nome dell'utente
  userPhone: string; //User phone - telefono dell'utente
  userEmail: string; //User email - email dell'utente
  phonePrefix: string; //Phone prefix - prefisso del telefono
  qtyFirst: number; //Quantity first - quantità adulti
  qtySecond: number; //Quantity second - quantità bambini
  qtyThird?: number; //Quantity third - quantità anziani
  note?: string; //Note - note
  dateReservation: string; //Date reservation - data della prenotazione  (YYYY-mm-dd)
  codeReservation?: string; //Code reservation - Codice dell'agenzia
  typeContact: ContactType[]; //Type contact - tipo di contatto (1 = whatsapp, 3 = email)
}

export type ReservationEditInterface = { id: number } & Omit<
  ReservationAddInterface,
  'productId' | 'slotId' | 'dateReservation' | 'codeReservation'
>;

export interface ReservationResponseInterface {
  esito: boolean;
  reservationId: number;
}

export interface CreatedOrderInterface {
  id: number;
  sku?: string;
  status: StatusOrder;
  name: string;
  amount: number; //Amount - importo
  valuta: string;
  note?: string;
  paymentResponse?: string; //JSON di risposta da eventuale pagamento
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmittedOrderInterface {
  reservationId: number;
  orderId: number;
  userName: string;
  userPrefix: string;
  userPhone: string;
  userEmail: string;
  product: Product;
  slot?: Slot;
}

export const enum StatusOrder {
  Active = 'active',
  Deleted = 'deleted',
  Progress = 'progress',
  Completed = 'completed',
}

export const enum StatusReservation {
  Active = 'active',
  Deleted = 'deleted',
  hidden = 'hidden',
  Pending = 'pending',
}

export const enum ContactType {
  EMAIL = 3,
  WHATSAPP = 1,
}
