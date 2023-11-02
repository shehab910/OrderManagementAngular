import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss']
})
export class NewProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      description: [''],
      quantity: ['',Validators.required],
      category:['', Validators.required]
    });
  }

  submitProduct() {
    const formData = this.productForm.value;

    this.productService.addProduct(formData).subscribe(() => {
      this.router.navigate(['/home']); // Navigate to the product list page after adding
    });
  }
}
