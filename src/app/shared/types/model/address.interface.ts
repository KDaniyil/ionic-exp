import { ModelResourse } from './modelResource.interface';

export interface AddressInterface {
  id: number;
  label?: string;
  typeId: number;
  status: StatusAddress;
  street: string;
  numeroCivico?: string;
  city: string;
  cap: string;
  provincia?: string;
  country?: string;
  countryCode?: string;
  phonePrefix?: string;
  phone?: number;
  resourceModel?: ModelResourse;
  resourceId?: number;
  note?: string;
  lat?: number;
  lon?: number;
  ownerId: number;
  userId?: number;
  groupId?: number;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}
export const enum StatusAddress {
  Pending = 'pending',
  Active = 'active',
  Deleted = 'deleted',
}
