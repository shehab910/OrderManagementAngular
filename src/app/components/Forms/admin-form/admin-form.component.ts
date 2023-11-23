import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.adminId = this.route.snapshot.paramMap.get('id');

    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitAdmin() {
    const formData = this.adminForm.value;
    this.userService
      .authenticatedRequest('POST', '/user/add-admin', formData)
      .then((_) => {
        this.snackBar.open('User created successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
      })
      .catch((_) => {
        this.snackBar.open('Error creating user', 'Close', {
          duration: 3000,
        });
      });
  }
}
