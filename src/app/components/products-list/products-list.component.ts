import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { HttpStatusCode } from '@angular/common/http';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the list of products from your service when the component is initialized
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAllProducts().then((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: string) {
    this.productsService
      .deleteProduct(id)
      .then((res) => {
        // If the deletion is successful, remove the product from the local list.
        if (res?.status === HttpStatusCode.Ok) {
          this.products = this.products.filter((product) => product.id !== id);
        } else {
          throw new Error('');
        }
      })
      .catch((error) => {
        // Handle the error, e.g., display an error message.
        console.error('Error deleting product', error);
      });
  }
}
