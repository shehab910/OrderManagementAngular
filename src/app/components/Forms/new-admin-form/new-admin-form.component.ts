import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'new-admin-form',
  templateUrl: './new-admin-form.component.html',
  styleUrls: ['./new-admin-form.component.scss']
})
export class NewAdminFormComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router) {}

  ngOnInit() {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['',Validators.required],
      role:['admin']
    });
  }

  submitAdmin() {
    const formData = this.adminForm.value;

    this.userService.registerUser(formData).subscribe(() => {
      this.router.navigate(['/home']); 
    });
  }
}
