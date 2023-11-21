import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent {
  adminForm: FormGroup;
  adminId: string;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminId = this.route.snapshot.paramMap.get('id');
    this.isEditing = !!this.adminId;

    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['admin'],
    });

    if (this.isEditing) {
      this.initializeFormForEdit(this.adminId);
    }
  }

  initializeFormForEdit(adminId: string) {
    // Fetch product details by ID and set the form values
    // this.userService.getUserById(adminId).subscribe((admin) => {
    //   if (admin && admin.length > 0) {
    //     const adminData = admin[0]; // Assuming it's an array with a single admin
    //     this.adminForm.setValue({
    //       firstName: adminData.firstName,
    //       lastName: adminData.lastName,
    //       email: adminData.email,
    //       password: adminData.password,
    //       role: adminData.role,
    //     });
    //   }
    // });
  }

  submitAdmin() {
    const formData = this.adminForm.value;

    if (this.isEditing) {
      // Handle editing logic here
      // this.userService.editAdmin(this.adminId, formData).subscribe(() => {
      //   this.router.navigate(['/home']);
      // });
    } else {
      // this.userService.registerUser(formData).subscribe(() => {
      //   this.router.navigate(['/home']);
      // });
    }
  }
}
