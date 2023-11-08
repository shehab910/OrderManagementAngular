import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    ) { }
  userRole: string = ''; 

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role') || '';
  }

  cartItemCount(): number {
    return this.shoppingCartService.getCartItems().length;
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
