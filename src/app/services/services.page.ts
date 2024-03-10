import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Category } from '../shared/types/model/category';
import { Product } from '../shared/types/model/product';
import { AppService } from '../shared/services/app.service';
import { HeaderComponent } from '../shared/components/header/header.component';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterLink,
    HeaderComponent,
  ],
})
export class ServicesPage implements OnInit {
  mainSlider: any[] = [];
  categoriesAndProducts: any[] = [];
  swiper!: Swiper;
  @ViewChild('swiper') swiperRef!: ElementRef<SwiperContainer>;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadSlider();
    this.loadProducts();
  }

  afterInit() {
    console.log('init swiper');
    this.swiper = this.swiperRef.nativeElement.swiper;
    this.swiper.init();
  }

  //slider principale
  async loadSlider(): Promise<void> {
    try {
      const productData: Product[] = await this.appService.getSliderList();
      this.mainSlider = await this.appService.combineProductsWithImage(
        productData,
        '1200x'
      );
      console.log(this.mainSlider, 'mainslider');
    } catch (error) {
    } finally {
    }
  }

  async loadProducts(): Promise<void> {
    this.categoriesAndProducts = [];

    try {
      // le categorie
      const categoryData: any = await this.appService.getCategoriesList('it');
      const categories: Category[] = categoryData['items'];

      // controllo se ci sono le categorie
      if (categories.length > 0) {
        // carico i prodotti per ogni categoria
        categories.forEach(async (category: Category) => {
          await this.combineCategoriesAndProducts(category);
        });
      }
    } catch (error) {
    } finally {
    }
  }

  // carico combino le categorie con i prodotti
  async combineCategoriesAndProducts(category: Category) {
    try {
      const productData: any = await this.appService.getProductsForCategory(
        category.id,
        'it'
      );
      const products: Product[] = productData['items'];

      if (products.length > 0) {
        const productsWithImages =
          await this.appService.combineProductsWithImage(products, '200x');

        this.categoriesAndProducts.push({
          ...category,
          products: productsWithImages,
        });
      }
    } catch (error) {
      throw new Error();
    } finally {
    }
  }
}
