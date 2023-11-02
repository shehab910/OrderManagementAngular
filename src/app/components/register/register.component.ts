import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // // Define an array of roles
  // roles = ['customer', 'admin'];

  // // Initialize the selected role with the first role in the array
  // selectedRole = this.roles[0];
  // // Handle role selection change
  // onRoleChange(event: Event): void {
  //   this.selectedRole = (event.target as HTMLSelectElement).value;
  // }

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    // role: ['', Validators.required]
  },{
    validators: passwordMatchValidator
  })

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
    ){}

  get firstName() {
    return this.registerForm.controls['firstName'];
  }
  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
  
  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe({
      next: (response) => {
        this.snackBar.open('Registered Successfully', 'Close', {
          duration: 3000, 
        });
        this.router.navigate(['login']);
      },
      error: (e) => {
        console.log(e);
        this.snackBar.open('Something went wrong!', 'Close', {
          duration: 3000,
        });
      }
  });
  }
}
