import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { EditProductFormComponent } from './components/Forms/edit-product-form/edit-product-form.component';
import { NewProductFormComponent } from './components/Forms/new-product-form/new-product-form.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { NewAdminFormComponent } from './components/Forms/new-admin-form/new-admin-form.component';
import { EditAdminFormComponent } from './components/Forms/edit-admin-form/edit-admin-form.component';

const routes: Routes = [
  {path:'home', component: HomeComponent, canActivate: [authGuard]},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  { path: 'products/edit/:id', component: EditProductFormComponent },
  { path: 'products/add', component: NewProductFormComponent },
  { path: 'admins/edit/:id', component: EditAdminFormComponent },
  { path: 'admins/add', component: NewAdminFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
