import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}
  userRole: string = '';

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role') || '';
  }

  cartItemCount(): number {
    return this.shoppingCartService.getNumberOfItems();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
