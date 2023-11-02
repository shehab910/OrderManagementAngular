import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatIconModule } from '@angular/material/icon';
import { NewProductFormComponent } from './components/Forms/new-product-form/new-product-form.component';
import { EditProductFormComponent } from './components/Forms/edit-product-form/edit-product-form.component';
import { AdminsTableComponent } from './components/admins-table/admins-table.component';
import { EditAdminFormComponent } from './components/Forms/edit-admin-form/edit-admin-form.component';
import { NewAdminFormComponent } from './components/Forms/new-admin-form/new-admin-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProductsListComponent,
    NewProductFormComponent,
    EditProductFormComponent,
    AdminsTableComponent,
    EditAdminFormComponent,
    NewAdminFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
