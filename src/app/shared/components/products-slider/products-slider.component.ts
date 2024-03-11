import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CampaignInterface } from '../../types/model/campaign.interface';
import { AppService } from '../../services/app.service';
import { Product } from '../../types/model/product';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsSliderComponent implements OnInit {
  @Input() products: Product[] | undefined;
  @Input() i: number = 0;
  campaigns: CampaignInterface[] = [];
  productsWithCampaign: (Product & {
    campaign?: boolean;
    campaignType?: number;
  })[] = [];

  constructor(private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    await this.loadCampaigns();

    if (this.products) {
      this.productsWithCampaign = this.products.map((product) => {
        const campaign = this.campaigns.find(
          (campaign) => +campaign.discountProductId === product.id
        );
        if (campaign) {
          return {
            ...product,
            campaign: true,
            campaignType: campaign.typeId === 0 ? 1 : campaign.typeId,
          };
        } else {
          return product;
        }
      });
    }
  }

  //carico le campagne attive
  async loadCampaigns(): Promise<void> {
    // this.loading.startLoading();
    try {
      const campaignsData: any = await this.appService.getCampaignsActive();
      this.campaigns = campaignsData['items'];
    } catch (error) {
      this.campaigns = [];
    } finally {
      // this.loading.stopLoading();
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
