import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NewProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;
  productId: string;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //TODO: This line generates error defering for later
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.productId;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [''],
      price: [null, Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
    });

    if (this.isEditing) {
      this.initializeFormForEdit(this.productId);
    }
  }

  initializeFormForEdit(productId: string) {
    // Fetch product details by ID and set the form values
    this.productService
      .getProductById(productId)
      .then((product: NewProduct) => {
        console.log('PRODUCT', product);
        //TODO: this return should be removed after making sure product have the correct fields
        if (product) {
          this.productForm.setValue({
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            description: product.description,
            category: product.categoryId,
            quantity: product.quantity,
          });
        }
      });
  }

  submitProduct() {
    //TODO: better way to map this
    const formData = {
      ...this.productForm.value,
      categoryId: this.productForm.value.category,
      category: undefined,
    };
    console.log(formData);

    if (this.isEditing) {
      // Handle editing logic here
      this.productService
        .editProduct(this.productId, formData)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            this.snackBar.open('Product updated successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/home']); // Navigate to the product list page after editing
          } else {
            throw new Error('Something went wrong!');
          }
        })
        .catch((_) => {
          this.snackBar.open('Something went wrong!', 'Close', {
            duration: 3000,
          });
        });
    } else {
      // Handle creating new product logic here
      this.productService
        .addProduct(formData)
        .then((res) => {
          console.log('response', res);
          //TODO: this status code should be CREATED both in front and back
          if (res.status === HttpStatusCode.Ok) {
            this.router.navigate(['/home']); // Navigate to the product list page after adding
          } else {
            this.snackBar.open(res?.data?.message, 'Close', {
              duration: 3000,
            });
          }
        })
        .catch((_) => {
          this.snackBar.open('Something went wrong!', 'Close', {
            duration: 3000,
          });
        });
    }
  }
}
