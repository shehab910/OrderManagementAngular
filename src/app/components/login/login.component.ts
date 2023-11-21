import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserLoginReq } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }
  loginUser() {
    const user: UserLoginReq = {
      email: this.email.value,
      password: this.password.value,
    };
    this.authService
      .login(user)
      .then((res: any) => {
        if (res?.status === HttpStatusCode.Ok) {
          this.router.navigate(['/home']);
        }
      })
      .catch((e) => {
        let errorMessage = 'Something went wrong!';
        if (e?.response?.status === HttpStatusCode.Forbidden) {
          errorMessage = "Email or Password isn't correct.";
        } else if (e?.response?.data?.message) {
          errorMessage = e.response.data.message;
        }
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });
      });
  }
}
