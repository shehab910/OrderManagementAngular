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
          console.log(res?.data, 'heloooooo');
          this.authService.setAuthToken(res?.data?.token);
          //TODO: change hardcoded values
          sessionStorage.setItem('email', 'blz@example.com');
          sessionStorage.setItem('role', 'CUSTOMER');
          this.router.navigate(['/home']);
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
  // loginUser() {
  //   const { email, password } = this.loginForm.value;
  //   this.authService.getUserByEmail(email as string).subscribe({
  //     next: (response) => {
  //       if (response.length > 0 && response[0].password === password) {
  //         this.authService.getUserRole(email as string).subscribe({
  //           next: (user) => {
  //           if(user){
  //             const role = user.role
  //             sessionStorage.setItem('email', email as string);
  //             sessionStorage.setItem('role', role);
  //             this.router.navigate(['/home']);
  //           }else{
  //               this.snackBar.open('Error getting user role.', 'Close', {
  //                 duration: 3000,
  //               });
  //           }
  //         },
  //         });
  //       } else {
  //         this.snackBar.open("Email or Password isn't correct.", 'Close', {
  //           duration: 3000,
  //         });
  //       }
  //     },
  //     error: (e) => {
  //       this.snackBar.open('Something Went wrong!', 'Close', {
  //         duration: 3000,
  //       });
  //     }

  // })
  // }
}
