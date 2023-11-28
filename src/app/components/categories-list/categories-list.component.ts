import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpStatusCode } from 'axios';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {

  categories: Category[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'actions',
  ];

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch the list of products from your service when the component is initialized
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService
      .getAllCategories()
      .then((data) => {
        this.categories = data;
      })
      .catch((_) => {
        this.snackBar.open('Error loading products', 'Close', {
          duration: 2000,
        });
      });
  }

  deleteCategory(id: string) {
    this.categoryService
      .deleteCategory(id)
      .then((res) => {
        // If the deletion is successful, remove the product from the local list.
        if (res?.status === HttpStatusCode.Ok) {
          this.categories = this.categories.filter((category) => category.id !== id);
          this.snackBar.open('category deleted successfully', 'Close', {
            duration: 2000,
          });
        }
      })
      .catch((_) => {
        this.snackBar.open('Error deleting products', 'Close', {
          duration: 2000,
        });
      });
  }
}
