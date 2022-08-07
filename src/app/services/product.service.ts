import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../environments/environment';
import { Product } from '../shared/product.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = config.apiUrl;
  openProductDetailSub!: Subject<Product>;
  openProductDetailObs$!: Observable<Product>;

  constructor(private http: HttpClient) {
    this.openProductDetailSub = new Subject<Product>();
    this.openProductDetailObs$ = this.openProductDetailSub.asObservable();
  }

  getAllProducts(size: number = 50): Observable<Product[]> {
    let url = this.baseUrl + `?size=${size}`;
    return this.http.get<Product[]>(url);
  }

  openProductDetail(product: Product) {
    this.openProductDetailSub.next(<Product>product);
  }
}
