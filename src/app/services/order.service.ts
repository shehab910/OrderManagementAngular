import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders: Order[] = [];

  constructor(private snackBar: MatSnackBar) { }

  createOrder(order: Order) {
    this.orders.push(order);
    this.snackBar.open("Order Placed Successfully", 'Close', {
      duration: 3000, 
    });
  }
}
