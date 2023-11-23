import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  categoryForm: FormGroup;
  categoryId: string;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //TODO: This line generates error defering for later
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.categoryId;

    this.categoryForm = this.fb.group({
      id:[''],
      name: ['', Validators.required],
    });

    if (this.isEditing) {
      this.initializeFormForEdit(this.categoryId);
    }
  }

  initializeFormForEdit(categoryId: string) {
    // Fetch category details by ID and set the form values
    this.categoryService
      .getCategoryById(categoryId)
      .then((category: Category) => {
        if (category) {
          this.categoryForm.setValue({
            id: category.id,
            name: category.name,
          });
        }
      })
      .catch((e) => {
        this.snackBar.open('Something went wrong!', 'Close', {
          duration: 3000,
        });
      });
  }

  submitCategory() {
    //TODO: better way to map this
    const formData = {
      ...this.categoryForm.value,
      categoryId: this.categoryForm.value.category,
      category: undefined,
    };

    if (this.isEditing) {
      // Handle editing logic here
      this.categoryService
        .editCategory(this.categoryId, formData)
        .then((res) => {
          if (res.status === HttpStatusCode.Ok) {
            this.snackBar.open('Category updated successfully', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/home']); // Navigate to the category list page after editing
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
      // Handle creating new category logic here
      this.categoryService
        .addCategory(formData)
        .then((res) => {
          //TODO: this status code should be CREATED both in front and back
          if (res.status === HttpStatusCode.Ok) {
            this.router.navigate(['/home']); // Navigate to the category list page after adding
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
