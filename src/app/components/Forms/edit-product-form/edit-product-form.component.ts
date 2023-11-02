import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss']
})
export class EditProductFormComponent {
  productForm: FormGroup;
  productId: string;

  constructor(private fb: FormBuilder, private productService: ProductsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      description: [''],
      quantity: ['',Validators.required],
      category:['', Validators.required]
    });

    this.initializeFormForEdit(this.productId);
  }

  initializeFormForEdit(productId: string) {
    // Fetch product details by ID and set the form values
    this.productService.getProductById(productId).subscribe((product) => {
      if (product && product.length > 0) {
        const productData = product[0]; // Assuming it's an array with a single product
        this.productForm.setValue({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          quantity: productData.quantity
        });
      }
    });
  }
  

  submitProduct() {
    const formData = this.productForm.value;

    // Handle editing logic here
    this.productService.editProduct(this.productId, formData).subscribe(() => {
      this.router.navigate(['/home']); // Navigate to the product list page after editing
    });
  }
}
