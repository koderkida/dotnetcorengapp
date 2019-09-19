import { KKCommon } from './../utilities/kkcommon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { flatMap, first, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private baseUrl = '/api/product/getproducts';

  private productUrl = '/api/product/addproduct';

  private deleteUrl = '/api/product/deleteproduct/';

  private updateUrl = '/api/product/updateproduct/';

  private product$: Observable<Product[]>;

  getProducts(): Observable<Product[]> {
    if (!this.product$) {
      this.product$ = this.http.get<Product[]>(KKCommon.API_GETPRODUCTS).pipe(shareReplay());
    }

    // if products cache exists return it
    return this.product$;

  }

  // Get Product by its ID
  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(flatMap(result => result), first(product => product.productId == id));
  }

  // Insert the Product
  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(KKCommon.API_ADDPRODUCT, newProduct);
  }

  // Update the Product

  updateProduct(id: number, editProduct: Product): Observable<Product> {
    return this.http.put<Product>(KKCommon.API_UPDATEPRODUCT + '/' + id, editProduct);
  }

  // Delete Product

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(KKCommon.API_DELETEPRODUCT + '/' + id);
  }


  // Clear Cache
  clearCache() {
    this.product$ = null;
  }
}
