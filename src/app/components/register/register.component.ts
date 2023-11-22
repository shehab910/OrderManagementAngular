import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserSignupReq } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      firstName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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
    this.authService
      .signup(postData as UserSignupReq)
      .then((res) => {
        if (res.status === 200) {
          this.snackBar.open('Registered Successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['login']);
        }
      })
      .catch((e) => {
        this.snackBar.open('Something went wrong!', 'Close', {
          duration: 3000,
        });
      });
  }
}
