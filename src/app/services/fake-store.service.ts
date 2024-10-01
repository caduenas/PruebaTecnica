import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeStoreService {
  private baseUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  // Método para obtener los productos
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // Método para obtener las categorías
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/categories`);
  }

  // Método para obtener productos por categoría
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/category/${category}`);
  }
}
