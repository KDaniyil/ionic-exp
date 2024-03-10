import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {
  Observable,
  catchError,
  lastValueFrom,
  map,
  retry,
  tap,
  throwError,
} from 'rxjs';
import { AddressInterface } from '../types/model/address.interface';
import { Category } from '../types/model/category';
import {
  GenerateCouponInterface,
  GenerateCouponResponseInterface,
} from '../types/model/coupon.interface';
import { JwtAccessToken } from '../types/model/jwtAccessToken';
import { ModelResourse } from '../types/model/modelResource.interface';
import { PrefixInterface } from '../types/model/prefix.interface';
import { Product, MediaFiles } from '../types/model/product';
import {
  ReservationEditInterface,
  ReservationResponseInterface,
  ReservationAddInterface,
  CreatedOrderInterface,
} from '../types/model/reservation.interface';
import { ResultLogin } from '../types/model/resultLogin';
import { SlotsAvailability, Slot } from '../types/model/slot';
import { TypeUser } from '../types/model/user';

const enum ApiEndPoint {
  availableSlots = 'tenerife/reservation/slots/available',
  availableRange = 'tenerife/reservation/slots/availableRange',
  getProduct = 'product/products/get',
  getProductList = 'product/products/list',
  getMedia = 'media/files/listFilter',
  getLocale = 'locale/i18n/list',
  addOrder = 'tenerife/reservation/createOrder',
  startPayment = 'payment/stripe/startReservation',
  getCategories = 'category/categories/categories',
  categoriesFilter = 'category/categories/filter',
  authToken = 'user/users/authToken',
  login = 'user/users/login',
  getSlidersList = 'slider/sliders/list',
  getTags = 'tag/tags/list',
  getAddress = 'product/products/getAddress',
  addReservation = 'tenerife/reservation/add',
  editReservation = 'tenerife/reservation/edit',
  generateCoupon = 'tenerife/reservation/coupon/generate',
  validateCoupon = 'tenerife/reservation/validateCoupon',
  refreshCodeCoupon = 'tenerife/reservation/coupon/refreshCode',
  validateContact = 'tenerife/reservation/validateContact',
  refreshCode = 'tenerife/reservation/refreshCode',
  checkPayment = 'tenerife/reservation/confirmEmail',
  getPrefixesList = 'locale/prefixes/list',
  campaignsActive = 'coupon/campaigns/listActive',
  sliderList = 'tenerife/reservation/slider/list',
  productsWithSameCategory = 'tenerife/reservation/categories/list',
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  /**
   *
   * Funzione pubblica che fornisce la lista di prodotti con categoria uguale al prodotto passato.
   *
   * @returns
   */
  async getProductsWithSameCategory(productId: number): Promise<Product[]> {
    try {
      return await lastValueFrom(
        this.http
          .post<Product[]>(
            `${environment.urlApi}${ApiEndPoint.productsWithSameCategory}`,
            { productId: productId }
          )
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   *
   * Funzione pubblica per listare un numero n di prodotti random da visualizzare (es Slider)
   * @returns
   */
  async getSliderList(): Promise<Product[]> {
    try {
      return await lastValueFrom(
        this.http
          .post<Product[]>(`${environment.urlApi}${ApiEndPoint.sliderList}`, {})
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   *
   * Funzione pubblica che fornisce la lista di tutte le promozioni attive.
   * @returns
   */
  async getCampaignsActive() {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.campaignsActive}`, {})
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  async getPrefixesList(): Promise<PrefixInterface[]> {
    try {
      return await lastValueFrom(
        this.http
          .get<PrefixInterface[]>(
            `${environment.urlApi}${ApiEndPoint.getPrefixesList}`
          )
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per controllare lo stato di pagamento di una prenotazione
   * @returns
   */
  async checkPayment(orderId: number, reservationId: number) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.checkPayment}`, {
            orderId: orderId,
            reservationId: reservationId,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per generare un ordine da associare alla prenotazione effettuata
   *
   * @returns
   */
  async refreshCode(id: number) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.refreshCode}`, {
            id: id,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per veirificare un contatto inserito da un cliente che ha effettuato una prenotazione
   * La funzione verifica che il codice inserito sia corrispondere a quello generato nella prenotazione
   * Viene verificata la scadenza del codice, impostata a 10 minuti dalla generazione della prenotazione.
   * @returns
   */
  async validateContact(id: number, code: string) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.validateContact}`, {
            id: id,
            code: code,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per generare un nuovo codice di verifica per il coupon da confermare.
   *
   * @returns
   */
  async refreshCodeCoupon(id: number) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.refreshCodeCoupon}`, {
            id: id,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per veirificare un contatto inserito da un cliente che ha richiesto un coupon
   *
   * @returns
   */
  async validateCoupon(id: number, code: string) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.validateCoupon}`, {
            id: id,
            code: code,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione pubblica per generare un coupon per un servizio di Tenerife
   *
   * @returns
   */
  async generateCoupon(
    coupon: GenerateCouponInterface
  ): Promise<GenerateCouponResponseInterface> {
    try {
      return await lastValueFrom(
        this.http
          .post<GenerateCouponResponseInterface>(
            `${environment.urlApi}${ApiEndPoint.generateCoupon}`,
            coupon
          )
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per modificare una prenotazione prima che venga creato un ordine di pagamento associato.
   *
   * @returns
   */
  async editReservation(
    reservation: ReservationEditInterface
  ): Promise<ReservationResponseInterface> {
    try {
      return await lastValueFrom(
        this.http.post<ReservationResponseInterface>(
          `${environment.urlApi}${ApiEndPoint.editReservation}`,
          reservation
        )
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione per aggiungere una prenotazione su Expery.
   *
   * @returns
   */
  async addReservation(
    reservation: ReservationAddInterface
  ): Promise<ReservationResponseInterface> {
    try {
      return await lastValueFrom(
        this.http.post<ReservationResponseInterface>(
          `${environment.urlApi}${ApiEndPoint.addReservation}`,
          reservation
        )
      );
    } catch (error) {
      throw new Error();
    }
  }
  //combino le immagini con i prodotti
  async combineProductsWithImage(
    products: Product | Product[],
    prefix: string
  ): Promise<Product[]> {
    // Verifico se 'products' è un array
    const isProductArray = Array.isArray(products);

    // Se 'products' è un singolo oggetto, converto in un array per l'elaborazione
    const productsArray = isProductArray ? products : [products];

    return Promise.all(
      productsArray.map(async (product) => {
        try {
          const mediaData: MediaFiles[] = await this.getMedia(
            product.id,
            true,
            prefix
          );
          return { ...product, imageUrl: mediaData[0]?.urlSigned || '' };
        } catch (error) {
          return { ...product, imageUrl: '' }; // Imposta un URL di immagine di fallback se necessario
        }
      })
    );
  }

  /**
   *
   * Funzione per recuperare i dati dell'indirizzo del prodotto
   *@param {number} id
   * @returns {AddressInterface}
   */
  async getAddress(id: number): Promise<AddressInterface> {
    try {
      return await lastValueFrom(
        this.http
          .post<AddressInterface>(
            `${environment.urlApi}${ApiEndPoint.getAddress}`,
            {
              id: id,
            }
          )
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  async startPayment(
    success_url: string,
    cancel_url: string,
    reservationId: number
  ) {
    try {
      return await lastValueFrom(
        this.http.post(`${environment.urlApi}${ApiEndPoint.startPayment}/`, {
          cancel_url: cancel_url,
          success_url: success_url,
          reservationId: reservationId,
        })
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   * Tags
   * La funzione ritorna l'intera lista dei tags.
   *
   * @returns
   */
  getTags(language: string) {
    return this.http
      .post(`${environment.urlApi}${ApiEndPoint.getTags}/`, {
        locale: language,
        orderField: 'name',
        filterStatus: 'active',
        filterResourceModel: 'Product',
      })
      .pipe(retry(3));
  }
  /**
   *Product
   * Funzione per recuperare singolo prodotto
   *
   * @returns
   */
  async getProduct(serviceId: number, language: string) {
    try {
      return await lastValueFrom(
        this.http
          .post<Product>(`${environment.urlApi}${ApiEndPoint.getProduct}/`, {
            locale: language,
            field: 'id',
            search: serviceId + '',
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   *
   * Funzione per recuperare i prodotti filtrati per groupId.
   *
   * @returns
   */
  async getProductList(groupId?: number) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.getProductList}/`, {
            filterGroup: groupId,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   *
   * Funzione per recuperare i prodotti filtrati per il nome.
   *
   * @returns
   */
  async getProductListForName(
    search: string,
    locale: string
  ): Promise<Product[]> {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.getProductList}/`, {
            search: search,
            locale: locale,
            filterStatus: 'active',
          })
          .pipe(
            retry(3),
            map((result: any) => result['items'])
          )
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   *
   * Funzione per recuperare i prodotti per tag
   *
   * @returns
   */
  async getProductListForTag(
    tagId: number,
    language: string
  ): Promise<Product[]> {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.getProductList}/`, {
            filterTagId: tagId,
            locale: language,
            filterStatus: 'active',
          })
          .pipe(
            retry(3),
            map((result: any) => result['items'])
          ) //ritorno solo gli items
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   *
   * Funzione per recuperare i prodotti filtrati per la categoria.
   *
   * @returns
   */
  async getProductsForCategory(categoryId: number, language: string) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.getProductList}/`, {
            filterCategoryId: categoryId,
            locale: language,
            filterStatus: 'active',
            category: true,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }
  /**
   *
   * Funzione pubblica per recuperare la lista degli Sliders.
   *
   * @returns
   */

  async getSlider(locale: string) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.getSlidersList}/`, {
            filterStatus: 'active',
            locale: locale,
          })
          .pipe(map((result: any) => result['items']))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Funzione per generare un ordine da associare alla prenotazione effettuata.
   */
  async addOrder(reservationId: number): Promise<CreatedOrderInterface> {
    try {
      return await lastValueFrom(
        this.http.post<CreatedOrderInterface>(
          `${environment.urlApi}${ApiEndPoint.addOrder}`,
          {
            reservationId: reservationId,
          }
        )
      );
    } catch (error) {
      throw new Error();
    }
  }

  getLocale(productId: number, language: string) {
    console.log('getLocale', 'productId: ' + productId);
    return this.http.post(`${environment.urlApi}${ApiEndPoint.getLocale}/`, {
      resourceId: productId,
      resourceModel: 'Product',
      languageCode: language,
    });
  }

  /**
   *
   * Funzione per recuperare i media files per id del prodotto/servizio.
   *
   * @returns
   */
  async getMedia(serviceId: number, featured?: boolean, prefix?: string) {
    try {
      return await lastValueFrom(
        this.http
          .post<any[]>(`${environment.urlApi}${ApiEndPoint.getMedia}/`, {
            resourceId: serviceId,
            resourceModel: 'Product',
            featured: featured,
            prefix: prefix,
          })
          .pipe(
            map((items) => {
              return items.map((item) => item.MediaFile);
            })
          )
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Slot
   * Funzione per recuperare gli slot liberi di un periodo
   *
   * @returns
   */
  async availableSlotsRange(
    serviceId: number,
    dateReservationStart: string,
    dateReservationEnd: string,
    numFirst: number,
    numSecond: number,
    numThird?: number
  ) {
    try {
      return await lastValueFrom(
        this.http
          .post<SlotsAvailability[]>(
            `${environment.urlApi}${ApiEndPoint.availableRange}`,
            {
              serviceId: serviceId,
              dateReservationStart: dateReservationStart,
              dateReservationEnd: dateReservationEnd,
              numFirst: numFirst,
              numSecond: numSecond,
              numThird: numThird,
            }
          )
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Slot
   * Funzione pubblica per controllare se una data è disponibile in base al numero di persone.
   *La disponibilità del turno è controllata sul totale delle persone, composto dalla somma delle varie fasce di prezzo (numFirst + Second + Third)
   * @returns
   */
  async availableSlots(
    serviceId: number,
    dateReservation: string,
    numFirst: number,
    numSecond: number,
    numThird?: number
  ) {
    try {
      return await lastValueFrom(
        this.http
          .post<Slot[]>(`${environment.urlApi}${ApiEndPoint.availableSlots}`, {
            serviceId: serviceId,
            dateReservation: dateReservation,
            numFirst: numFirst,
            numSecond: numSecond,
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Categories del prodotto
   * La funzione ritorna la lista delle categorie associate ad un ResourceModel, ad es. Product, Service.
   *
   * @returns
   */
  async getCategoriesOfProduct(
    language: string,
    resourceId: number
  ): Promise<Category[]> {
    try {
      return await lastValueFrom(
        this.http
          .post<Category[]>(
            `${environment.urlApi}${ApiEndPoint.categoriesFilter}/`,
            {
              locale: language,
              filterResourceModel: ModelResourse.Product,
              resourceId: resourceId,
            }
          )
          .pipe(
            retry(3),
            map((result: any) =>
              result['items'].map((item: any) => item.Category as Category)
            )
          )
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Categories
   * La funzione ritorna l'intera lista delle categorie
   *
   * @returns
   */
  async getCategoriesList(language: string) {
    try {
      return await lastValueFrom(
        this.http
          .post(`${environment.urlApi}${ApiEndPoint.getCategories}/`, {
            locale: language,
            filterResourceModel: 'Product',
            orderField: 'order',
            orderDirection: 'ASC',
          })
          .pipe(retry(3))
      );
    } catch (error) {
      throw new Error();
    }
  }

  /**
   * Handle Http operation that failed
   * Let the app continue
   * @param operation - name of the operation failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.log(`${operation} failed: ${error.message}`);

      return throwError(error);
    };
  }
}
