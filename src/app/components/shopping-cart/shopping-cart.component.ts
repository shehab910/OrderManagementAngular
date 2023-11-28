import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/interfaces/cartItem';
import { Product } from 'src/app/interfaces/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.cartItems = shoppingCartService.getCartItems();
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  increaseQuantity(item: CartItem) {
    this.shoppingCartService.addToCart(item.product);
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  //TODO: implement this
  decreaseQuantity(item: CartItem) {
    // this.shoppingCartService.removeFromCart(item.product);
    // this.cartItems = this.shoppingCartService.getCartItems();
    throw new Error('Method not implemented.');
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.shoppingCartService.clearCart();
    return (this.cartItems = this.shoppingCartService.getCartItems());
  }
  goToCheckout() {
    this.router.navigate(['checkout']);
  }

  submitOrder(cartItems: CartItem[]){
    if(cartItems.length>0)
    {this.shoppingCartService.submitOrder(cartItems).then((res) => {
      if (res && res.status === HttpStatusCode.Ok) {
        this.router.navigate(['/home']);
      }
    })
    .catch((_) => {
      this.snackBar.open('Something went wrong!', 'Close', {
        duration: 3000,
      });
    });
  }else
    {
      this.snackBar.open('Please insert items into your cart first', 'Close', {
        duration: 3000,
      });
    }
}
}
