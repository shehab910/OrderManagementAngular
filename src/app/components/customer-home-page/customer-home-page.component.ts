import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.scss'],
})
export class CustomerHomePageComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  filteredProducts: Product[];

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .then((data) => {
        this.products = data;
        this.filteredProducts = this.products;
      })
      .catch((_) => {
        this.snackBar.open('Error loading products', 'Close', {
          duration: 2000,
        });
      });
  }
  onSearch() {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);
    this.snackBar.open('Added to cart', 'Close', {
      duration: 2000,
    });
  }
}
