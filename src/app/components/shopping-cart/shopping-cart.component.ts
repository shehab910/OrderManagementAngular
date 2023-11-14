import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cartItem';
import { Product } from 'src/app/interfaces/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];

  constructor(private shoppingCartService: ShoppingCartService,
    private router: Router) {
    this.cartItems = shoppingCartService.getCartItems();
  }

  removeFromCart(product: Product) {
    this.shoppingCartService.removeFromCart(product);
    this.cartItems = this.shoppingCartService.getCartItems();
  }

  increaseQuantity(item: CartItem) {
    item.quantity += 1;
  }

  decreaseQuantity(item: CartItem) {
      if (item.quantity > 1) {
          item.quantity -= 1;
      }
  }


  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price*item.quantity, 0);
  }

  clearCart(){
    this.shoppingCartService.clearCart();
    return this.cartItems = this.shoppingCartService.getCartItems();
  }
  goToCheckout(){
    this.router.navigate(['checkout']);
  }
}
