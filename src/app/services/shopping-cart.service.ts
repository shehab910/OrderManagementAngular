import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cartItem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor( private snackBar: MatSnackBar,) { }
  
  cartItems: CartItem[] = [];


  addToCart(product: Product) {
    if(product.quantity===0){
      this.snackBar.open('This product is currently unavailable', 'Close', {
        duration: 3000,
      });
    }else{
      const existingItem = this.cartItems.find((item) => item.product.id === product.id);
  
      if (existingItem) {
        // Increment the quantity if the item already exists
        existingItem.quantity += 1;
      } else {
        // Add a new item to the cart if it doesn't exist
        this.cartItems.push({ product, quantity: 1 });
      }
    }
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex((item) => item.product.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }
}
