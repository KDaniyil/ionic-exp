export interface Product {
  id: number;
  status: string;
  source: string;
  externalId?: string;
  groupId?: number;
  type: string;
  aliasQty?: number;
  aliasProductId?: number;
  unityType?: string;
  unityType2?: string;
  conversionValue?: number;
  priceFirst?: number;
  priceSecond?: number;
  sku?: string;
  ean?: string;
  upc?: string;
  name: string;
  abstract?: string;
  description?: string;
  imageUrl?: string;
  slug?: string;
  featured?: boolean;
  userId?: number;
  extraInfo?: string;
  mediaFiles?: MediaFiles[];
  createdAt?: string;
  updatedAt?: string;
  tagResources?: TagResource[];
  categoryResources?: CategoryResources[];
}

interface CategoryResources {
  id: number;
  status: string;
  featured?: boolean;
  categoryId: number;
  resourceModel: string;
  resourceId?: number;
  order?: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

interface TagResource {
  id: number;
  status: string;
  featured?: boolean;
  tagId: number;
  resourceModel: string;
  resourceId?: number;
  order?: number;
  userId: number;
  review?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaFiles {
  id: number;
  status?: string;
  name?: string;
  abstract?: string;
  description?: string;
  url: string;
  groupId?: number;
  createdAt?: string;
  updatedAt?: string;
  urlSigned: string;
}
