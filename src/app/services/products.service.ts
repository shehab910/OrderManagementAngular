import { Injectable } from '@angular/core';
import { NewProduct } from '../interfaces/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private authService: AuthService) {}
  
  // get all products
  getAllProducts() {
    return this.authService
    .authenticatedRequest('GET', '/inventory/all', {})
    .then((res) => {
      if (res?.status === 200) {
        return res?.data;
      }
    });
  }

  // get a specific product
  getProductById(id: string) {
    return this.authService
    .authenticatedRequest('GET', `/products/${id}`, {})
    .then((res) => {
      if (res?.status === 200) {
          return res?.data;
        }
      });
    }
    
    // add new product
    addProduct(productDetails: NewProduct) {
      const url = '/products/add';
      return this.authService.authenticatedRequest('POST', url, productDetails);
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
  deleteProduct(id: number) {
    return this.authService.authenticatedRequest(
      'DELETE',
      `/products/delete/${id}`,
      {}
    );
  }
}
