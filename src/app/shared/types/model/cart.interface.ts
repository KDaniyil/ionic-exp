import { Product } from './product';
import { Slot } from './slot';

export interface CartItem {
  countAdult: number;
  countChild: number;
  countOld: number;
  priceTotal: number;
  service: Product;
  slot?: Slot;
  dateReservation?: string;
}
