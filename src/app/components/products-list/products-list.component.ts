import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = []; 
  displayedColumns: string[] = ['name', 'description', 'category', 'price', 'quantity', 'actions'];

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the list of products from your service when the component is initialized
    this.loadProducts();
  }
  
  loadProducts() {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(() => {
      // If the deletion is successful, remove the product from the local list.
      this.products = this.products.filter((product) => product.id !== id);
    }, (error) => {
      // Handle the error, e.g., display an error message.
      console.error('Error deleting product:', error);
    });
  }
}


