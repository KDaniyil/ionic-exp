import { ContactType } from './reservation.interface';

export interface GenerateCouponInterface {
  discountProductId: number; //Discount product id - id del prodotto
  userName: string; //User name - nome dell'utente
  userEmail: string; //User email - email dell'utente
  typeContact: ContactType[]; //Type contact - tipo di contatto (1 = whatsapp, 3 = email)
}

export interface GenerateCouponResponseInterface {
  couponId: number; // id del coupon
}
