export interface Category {
  id: number;
  resourceModel: string;
  status: string;
  name: string;
  abstract?: string;
  description?: string;
  slug?: string;
  extraInfo?: string;
  note?: string;
  order?: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}
