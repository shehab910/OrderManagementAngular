import { Injectable } from '@angular/core';
import { Product, NewProduct } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private authService: AuthService, private http: HttpClient) {}
  // add new product
  addProduct(productDetails: NewProduct) {
    const url = '/products/add';
    return this.authService.authenticatedRequest('POST', url, productDetails);
  }

  getProductById(id: string) {
    return this.authService
      .authenticatedRequest('GET', `/products/${id}`, {})
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          return res?.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // get all products
  getAllProducts() {
    return this.authService
      .authenticatedRequest('GET', '/products', {})
      .then((res) => {
        console.log(res);
        if (res?.status === 200) {
          return res?.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Edit a product
  editProduct(id: string, productDetails: NewProduct) {
    return this.authService.authenticatedRequest(
      'PUT',
      `/products/edit/${id}`,
      productDetails
    );
  }

  // Delete a product
  deleteProduct(id: string) {
    return this.authService.authenticatedRequest(
      'DELETE',
      `/products/delete/${id}`,
      {}
    );
  }
}
