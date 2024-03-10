export interface CampaignInterface {
  id: number;
  status: CampaignStatus;
  typeId?: number;
  groupId?: number;
  name: string;
  abstract?: string;
  description?: string;
  dateStart: string;
  dateEnd: string;
  campaignType: CampaignType;
  visibility: string;
  activable: boolean;
  points: number;
  discountValue: number;
  discountAmountMin: number;
  discountProductId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const enum CampaignStatus {
  ACTIVE = 'active',
  HIDDEN = 'hidden',
  DELETED = 'deleted',
}
const enum CampaignType {
  coupon_percent = 'coupon-percent',
  coupon_value = 'coupon-value',
  product_price = 'product-price',
  product_gift = 'product-gift',
}
