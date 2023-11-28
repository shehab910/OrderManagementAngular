import { Injectable} from '@angular/core';
import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cartItem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { Item } from '../interfaces/item';
import { HttpStatusCode } from 'axios';

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {
  cartItems: CartItem[] = [];
  items: Item[] = [];
  orderId: number;
  
  constructor(private snackBar: MatSnackBar,private authService: AuthService) {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  }

  syncCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(product: Product) {
    if (product.quantity === 0) {
      this.snackBar.open('This product is currently unavailable', 'Close', {
        duration: 3000,
      });
    } else {
      const existingItem = this.cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Increment the quantity if the item already exists
        existingItem.quantity += 1;
      } else {
        // Add a new item to the cart if it doesn't exist
        this.cartItems.push({ product, quantity: 1 });
      }
      product.quantity -= 1;
    }
    this.syncCart();
  }

  removeFromCart(product: Product) {
    //remove the item from the cart even if the quantity is greater than 1
    //add the item back to the inventory
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== product.id
    );
    product.quantity += 1;
  }

  decreaseQuantity(product: Product) {
    //find the item in the cart
    // if the item exists, decrement the quantity
    // if the quantity is 0, remove the item from the cart
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity -= 1;
      product.quantity += 1;
      if (existingItem.quantity === 0) {
        this.cartItems = this.cartItems.filter(
          (item) => item.product.id !== product.id
        );
      }
    }
    this.syncCart();
  }

  getCartItems() {
    return this.cartItems;
  }

  getNumberOfItemTypes() {
    return this.cartItems.length;
  }

  getNumberOfItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.items = [];
    this.syncCart();
  }

  async submitOrder(cartItems: CartItem[]) {
    try {
      let order = {
        customerId: sessionStorage.getItem('id'),
        orderDate: new Date()
      };
  
      const orderResponse = await this.authService.authenticatedRequest('POST', '/order/create', order);
      this.orderId = orderResponse.data.orderId;
  
      for (let i = 0; i < cartItems.length; i++) {
        let newItem = {
          orderId: this.orderId,
          productId: cartItems[i].product.id,
          itemPrice: cartItems[i].product.price,
          quantity: cartItems[i].quantity
        };
        this.items.push(newItem);
      }

      const submitResponse = await this.authService.authenticatedRequest('POST', '/order/submit', this.items);
      this.clearCart();
      return submitResponse;
    } catch (error) {
      console.error('Error submitting order:', error);
      return { status: HttpStatusCode.InternalServerError, data: null };
    }
  }
}
