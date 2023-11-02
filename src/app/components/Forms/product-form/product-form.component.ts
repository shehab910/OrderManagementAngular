import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  productForm: FormGroup;
  productId: string;
  isEditing: boolean;

  constructor(private fb: FormBuilder, private productService: ProductsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.productId;

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: [''],
      price: [null, Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      category: ['', Validators.required]
    });

    if (this.isEditing) {
      this.initializeFormForEdit(this.productId);
    }
  }

  initializeFormForEdit(productId: string) {
    // Fetch product details by ID and set the form values
    this.productService.getProductById(productId).subscribe((product) => {
      if (product && product.length > 0) {
        const productData = product[0];
        this.productForm.setValue({
          name: productData.name,
          imageUrl: productData.imageUrl,
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

    if (this.isEditing) {
      // Handle editing logic here
      this.productService.editProduct(this.productId, formData).subscribe(() => {
        this.router.navigate(['/home']); // Navigate to the product list page after editing
      });
    } else {
      // Handle creating new product logic here
      this.productService.addProduct(formData).subscribe(() => {
        this.router.navigate(['/home']); // Navigate to the product list page after adding
      });
    }
  }
}
