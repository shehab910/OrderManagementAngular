import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { HttpStatusCode } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'name',
    'description',
    'category',
    'price',
    'quantity',
    'actions',
  ];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Fetch the list of products from your service when the component is initialized
    this.loadProducts();
  }

  loadProducts() {
    this.productsService
      .getAllProducts()
      .then((data) => {
        this.products = data;
      })
      .catch((_) => {
        this.snackBar.open('Error loading products', 'Close', {
          duration: 2000,
        });
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(id)
      .then((res) => {
        // If the deletion is successful, remove the product from the local list.
        if (res?.status === HttpStatusCode.Ok) {
          this.products = this.products.filter((product) => product.id !== id);
          this.snackBar.open('Product deleted successfully', 'Close', {
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
