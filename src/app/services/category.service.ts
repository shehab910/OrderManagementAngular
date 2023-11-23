import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private authService: AuthService) {}

  private baseURL = 'http://localhost:8010';
  
  // get all categories
  getAllCategories() {
    return this.authService
    .authenticatedRequest('GET', `${this.baseURL}/categories/all`, {})
    .then((res) => {
      if (res?.status === 200) {
        return res?.data;
      }
      });
    }

    // get a single category 
    getCategoryById(id: string) {
      return this.authService
      .authenticatedRequest('GET', `${this.baseURL}/categories/${id}`, {})
      .then((res) => {
        if (res?.status === 200) {
          return res?.data;
        }
      });
    }
    
    // add new category
    addCategory(category: Category) {
      const url = `${this.baseURL}/categories/add`;
      return this.authService.authenticatedRequest('POST', url, category);
    }

  // Edit a category
  editCategory(id: string, category: Category) {
    return this.authService.authenticatedRequest(
      'PUT',
      `/categories/edit/${id}`,
      category
    );
  }

  // Delete a category
  deleteCategory(id: string) {
    return this.authService.authenticatedRequest(
      'DELETE',
      `${this.baseURL}/categories/delete/${id}`,
      {}
    );
  }
}
