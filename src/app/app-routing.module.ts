import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { ProductFormComponent } from './components/Forms/product-form/product-form.component';
import { AdminFormComponent } from './components/Forms/admin-form/admin-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CategoryFormComponent } from './components/Forms/category-form/category-form.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [authGuard]},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'categories/edit/:id', component: CategoryFormComponent },
  { path: 'categories/add', component: CategoryFormComponent },
  { path: 'admins/edit/:id', component: AdminFormComponent },
  { path: 'admins/add', component: AdminFormComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
